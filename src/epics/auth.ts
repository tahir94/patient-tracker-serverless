import { Injectable } from '@angular/core';
import { ActionsObservable } from 'redux-observable';
import { Http, Headers } from '@angular/http';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';

import { NgRedux, select } from "ng2-redux";
import { AppState } from '../reducers/rootReducer';
import { SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAILED,LOGIN_FAILED,SET_DATA_LOCALLLY,LOCAL_DATA_SUCCESS } from "../actions/auth";
// rxjs imports
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/fromPromise';
import { LOGIN, LOGIN_SUCCESS, LOGOUT, LOGOUT_SUCCESS, GET_DATA_LOCALLY } from "../actions/auth";

@Injectable()

export class AuthEpic {
	constructor(private http: Http,
		private afAuth: AngularFireAuth) { }

		SetDataLocally = (actions$ : ActionsObservable<any>)=>{
			return actions$.ofType(SET_DATA_LOCALLLY)
			.switchMap(({payload})=>{
				console.warn('SET ITME');
				
			localStorage.setItem('token',payload.uid)	
				return Observable.of()
			})
		}

		GetDataLocal = (actions$ : ActionsObservable<any>)=>{
			return actions$.ofType(GET_DATA_LOCALLY)
			.switchMap(({navCtrl})=>{
				// console.warn('GET ITEM');
				// console.log(localStorage.getItem('token'));
			    new Promise((resolve,reject)=>{

				   firebase.auth().onAuthStateChanged((user)=>{
										
						if(localStorage.getItem('token')){
							console.warn('tokenn');
							
								 navCtrl();
								}
							})
							
						}) 
						return Observable.of({type : LOCAL_DATA_SUCCESS,payload : 'local data success'})
				   
				   
					
				
			})
		}

	Signup = (actions$: ActionsObservable<any>) => {


		return actions$.ofType(SIGNUP)
			.switchMap(({ payload, navCtrl }) => {
				console.log('epic signup', payload);
				return Observable.fromPromise(this.afAuth.auth.createUserWithEmailAndPassword(payload.userEmail, payload.userPassword))
					.switchMap((responce) => {
						console.log("afaf", responce);

						payload.uid = responce.uid;
						let headers = new Headers();
						headers.append('Content-Type', 'application/json');

						return this.http.post('http://localhost:5000/patient-tracker-b35bc/us-central1/signup', payload, { headers: headers })
							.switchMap(res => {
								console.log(res);
								navCtrl();
								return Observable.of({ type: SIGNUP_SUCCESS, payload: payload })
							})
							.catch((error)=>{
								console.log(error);
								return Observable.of({type: SIGNUP_FAILED, payload : error.message})
							})

					})


				// return Observable.of({ type: "SIGNUP_SUCCESS", payload: "payload" });
			})
	}

	Login = (actions$: ActionsObservable<any>) => {
		return actions$.ofType(LOGIN)
			.switchMap(({ payload, navCtrl }) => {
				console.log('epic login', payload);

			return Observable.fromPromise(this.afAuth.auth.signInWithEmailAndPassword(payload.userEmail, payload.userPassword))
					.switchMap((responce) => {
						console.log(responce);
						let headers = new Headers();
						headers.append('Content-Type', 'application/json');
						payload.uid = this.afAuth.auth.currentUser.uid;
					return this.http.post('http://localhost:5000/patient-tracker-b35bc/us-central1/login', payload, {headers: headers})
						    .switchMap(res =>{
								console.log(res.json());
								navCtrl();
								return Observable.of({type : LOGIN_SUCCESS,payload : payload})
							}).catch((error)=>{
								console.log(error);
								return Observable.of({type : LOGIN_FAILED,payload : error.message})
							})
					// })
					// .catch((error) => {
					// 	console.log(error);

					// })


				// if(res.status == 404){               
				// }
				// navCtrl();
				// return Observable.of({type : LOGIN_SUCCESS,payload : res.json()})                    
				//    return Observable.of()
				// })
				// return Observable.of()
			})
			})
	}

	Logout = (actions$ : ActionsObservable<any>)=>{
		return actions$.ofType(LOGOUT)
		.switchMap(({navCtrl})=>{
			this.afAuth.auth.signOut();
			localStorage.removeItem('token');
			navCtrl();
			return Observable.of({type  : LOGOUT_SUCCESS})
		})
	}
}
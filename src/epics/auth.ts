import { Injectable } from '@angular/core';
import { ActionsObservable } from 'redux-observable';
import { Http, Headers } from '@angular/http';
import { AngularFireAuth } from 'angularfire2/auth';


import { NgRedux,select } from "ng2-redux";
import { AppState } from '../reducers/rootReducer';
import { SIGNUP,SIGNUP_SUCCESS } from "../actions/auth";
// rxjs imports
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/fromPromise';
import { LOGIN,LOGIN_SUCCESS,LOGOUT,LOGOUT_SUCCESS,GET_DATA_LOCALLY } from "../actions/auth";

@Injectable()

export class AuthEpic {
	constructor(private http : Http,
				private afAuth : AngularFireAuth){}
	Signup = (actions$ : ActionsObservable<any>)=>{
		

        return actions$.ofType(SIGNUP)
        .switchMap(({payload,navCtrl})=>{
            console.log('epic signup',payload);
			let headers = new Headers();
			this.afAuth.auth.createUserWithEmailAndPassword(payload.email, payload.password)
			.then((responce)=>{
				console.log(responce);
				
			})
			.catch((error)=>{
				console.log(error);
				
			})
			
			headers.append('Content-Type', 'application/json');

			this.http.post('http://localhost:5000/patient-tracker-b35bc/us-central1/signup', payload, {headers: headers})
			.subscribe(res => {
				console.log(res);
				
			})
		return Observable.of();
		})
	}

	Login = (actions$ : ActionsObservable<any>)=>{
        return actions$.ofType(LOGIN)
        .switchMap(({payload,navCtrl})=>{
			console.log('epic login',payload);

			this.afAuth.auth.signInWithEmailAndPassword(payload.email, payload.password)
			.then((responce)=>{
				console.log(responce);
				
			})
			.catch((error)=>{
				console.log(error);
				
			})

            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
             this.http.post('http://localhost:5000/patient-tracker-b35bc/us-central1/login', payload, {headers: headers})
                .subscribe(res =>{
                    console.log(res);
					
                    // if(res.status == 404){               
                    // }
                    // navCtrl();
                    // return Observable.of({type : LOGIN_SUCCESS,payload : res.json()})                    
			//    return Observable.of()
				})
				return Observable.of()
        })
	}
	
	// Logout = (actions$ : ActionsObservable<any>)=>{
	// 	return actions$.ofType(LOGOUT)
	// 	.switchMap(({navCtrl})=>{
	// 		localStorage.removeItem('token')
	// 		navCtrl();
	// 		return Observable.of()
	// 	})
	// }
}
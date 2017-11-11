import { Injectable } from '@angular/core';
import { ActionsObservable } from 'redux-observable';
import { Http, Headers } from '@angular/http';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';

import { NgRedux, select } from "ng2-redux";
import { AppState } from '../reducers/rootReducer';
import { SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAILED, LOGIN_FAILED, SET_DATA_LOCALLLY, LOCAL_DATA_SUCCESS } from "../actions/auth";
// rxjs imports
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/fromPromise';
import { LOGIN, LOGIN_SUCCESS, LOGOUT, LOGOUT_SUCCESS, GET_DATA_LOCALLY, LOCAL_DATA_FAILED } from "../actions/auth";

@Injectable()

export class AuthEpic {
	constructor(private http: Http,
		private afAuth: AngularFireAuth) { }

	SetDataLocally = (actions$: ActionsObservable<any>) => {
		return actions$.ofType(SET_DATA_LOCALLLY)
			.switchMap(({ payload }) => {

				localStorage.setItem('token', payload.uid)
				return Observable.of()
			})
	}

	GetDataLocal = (actions$: ActionsObservable<any>) => {
		return actions$.ofType(GET_DATA_LOCALLY)
			.switchMap(({ navCtrl }) => {
				return new Promise((resolve, reject) => {

					return firebase.auth().onAuthStateChanged((user) => {

						if (localStorage.getItem('token')) {
							navCtrl();
							return Observable.of({ type: LOCAL_DATA_SUCCESS, payload: 'local data success' })
						}
						else {
							return Observable.of({ type: LOCAL_DATA_FAILED, payload: 'payload' })
						}
					})
				})
			})
	}

	Signup = (actions$: ActionsObservable<any>) => {

		return actions$.ofType(SIGNUP)
			.switchMap(({ payload, navCtrl }) => {
				return Observable.fromPromise(this.afAuth.auth.createUserWithEmailAndPassword(payload.userEmail, payload.userPassword))
					.switchMap((responce) => {

						payload.uid = responce.uid;
						let headers = new Headers();
						headers.append('Content-Type', 'application/json');
						// local url
						// 'http://localhost:5000/patient-tracker-b35bc/us-central1/signup'

						let url = "https://us-central1-patient-tracker-b35bc.cloudfunctions.net/signup"
						return this.http.post(url, payload, { headers: headers })
							.switchMap(res => {
								navCtrl();
								return Observable.of({ type: SIGNUP_SUCCESS, payload: payload })
							})
							.catch((error) => {
								return Observable.of({ type: SIGNUP_FAILED, payload: error.message })
							})
					})
			})
	}

	Login = (actions$: ActionsObservable<any>) => {
		return actions$.ofType(LOGIN)
			.switchMap(({ payload, navCtrl }) => {

				return Observable.fromPromise(this.afAuth.auth.signInWithEmailAndPassword(payload.userEmail, payload.userPassword))
					.switchMap((responce) => {

						let headers = new Headers();
						headers.append('Content-Type', 'application/json');
						payload.uid = this.afAuth.auth.currentUser.uid;
						// local url
						// http://localhost:5000/patient-tracker-b35bc/us-central1/login
						let url = "https://us-central1-patient-tracker-b35bc.cloudfunctions.net/login"
						return this.http.post(url, payload, { headers: headers })
							.switchMap(res => {

								navCtrl();
								return Observable.of({ type: LOGIN_SUCCESS, payload: payload })
							}).catch((error) => {
								return Observable.of({ type: LOGIN_FAILED, payload: error.message })
							})
					})
			})
	}

	Logout = (actions$: ActionsObservable<any>) => {
		return actions$.ofType(LOGOUT)
			.switchMap(({ navCtrl }) => {
				this.afAuth.auth.signOut();
				localStorage.removeItem('token');
				navCtrl();
				return Observable.of({ type: LOGOUT_SUCCESS })
			})
	}
}
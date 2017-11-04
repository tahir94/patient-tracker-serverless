import { Injectable } from '@angular/core';
import { ActionsObservable } from 'redux-observable';
import { Http, Headers } from '@angular/http';

import { NgRedux, select } from "ng2-redux";
import { AppState } from '../reducers/rootReducer';

import {
	ADD_PATIENT, ADD_PATIENT_SUCCESS, DELETE,
	DELETE_SUCCESS, GET_PATIENT, GET_PATIENT_SUCCESS,
	SET_DATA_LOCALLLY, LOCAL_DATA_SUCCESS,EDIT,EDIT_SUCCESS
} from "../actions/patient";

import { AngularFireAuth } from "angularfire2/auth";

// rxjs imports
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/fromPromise';

@Injectable()

export class PatientEpic {
	constructor(private http: Http, private afAuth: AngularFireAuth) {

	}
	Patient = (actions$: ActionsObservable<any>) => {
		return actions$.ofType(ADD_PATIENT)
			.switchMap(({ payload }) => {
				console.log('patient epic', payload);
				let headers = new Headers();

				headers.append('Content-Type', 'application/json');
				let url = 'http://localhost:5000/patient-tracker-b35bc/us-central1/addPatient';
				payload['userId'] = this.afAuth.auth.currentUser.uid;
				this.http.post(url, payload, { headers: headers })
					.subscribe((res) => {
						console.log(res);

					})
				return Observable.of({ type: ADD_PATIENT_SUCCESS, payload: payload });
			})
	}

	GetPatient = (actions$: ActionsObservable<any>) => {
		return actions$.ofType(GET_PATIENT)
			.switchMap(() => {
				console.log('get patient epic');

				let headers = new Headers();
				headers.append('Content-Type', 'application/json');

				let currentUserUid = this.afAuth.auth.currentUser.uid;

			return	this.http.get('http://localhost:5000/patient-tracker-b35bc/us-central1/getPatients/?uid=' + currentUserUid)
					.switchMap((res => {
						console.log(res.json());
						let patientUids = Object.keys(res.json())
						console.log(patientUids);
					return	this.http.get('http://localhost:5000/patient-tracker-b35bc/us-central1/fetchPatients/?patientUids=' + patientUids)
							.switchMap((res => {

								console.log('fetch epic', res.json());

								return Observable.of({type: GET_PATIENT_SUCCESS,payload : res.json()})
							}))
					}))
			})
	}

	EditPatient = (actions$ :ActionsObservable<any>)=>{
		return actions$.ofType(EDIT)
		.switchMap(({payload})=>{
			let headers = new Headers;
			headers.append('Content-Type','application/json');

			let currentUserUid = this.afAuth.auth.currentUser.uid;
			this.http.post('',payload)
			.subscribe(res => {
				console.log(res);
				
			})
			return Observable.of()
		})
	}
}
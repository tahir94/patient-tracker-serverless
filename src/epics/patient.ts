import { Injectable } from '@angular/core';
import { ActionsObservable } from 'redux-observable';
import { Http, Headers } from '@angular/http';

import { NgRedux, select } from "ng2-redux";
import { AppState } from '../reducers/rootReducer';

import {
	ADD_PATIENT, ADD_PATIENT_SUCCESS, DELETE,
	DELETE_SUCCESS, GET_PATIENT, GET_PATIENT_SUCCESS,
	SET_DATA_LOCALLLY, LOCAL_DATA_SUCCESS
} from "../actions/patient";

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
	constructor(private http: Http) {

	}
	Patient = (actions$: ActionsObservable<any>) => {
		return actions$.ofType(ADD_PATIENT)
			.switchMap(({ payload }) => {
				console.log('patient epic', payload);
				let headers = new Headers();

				headers.append('Content-Type', 'application/json');
				let url = 'https://us-central1-patient-tracker-b35bc.cloudfunctions.net/addPatient';
				this.http.post(url, payload, { headers: headers })
					.subscribe()
				return Observable.of({ type: ADD_PATIENT_SUCCESS, payload: payload });
			})
	}
}
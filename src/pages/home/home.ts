import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PatientFormPage } from "../patient-form/patient-form";
import { NgRedux, select } from "ng2-redux";
import { AppState } from "../../reducers/rootReducer";
import { Observable } from "rxjs";
import { GET_REALTIME_UPDATE } from "../../actions/patient";

import { GET_PATIENT } from "../../actions/patient";
import { LOGOUT, SET_DATA_LOCALLLY } from "../../actions/auth";

import { PatientDetailsPage } from "../patient-details/patient-details";
import { LoginPage } from "../login/login";

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})

export class HomePage implements OnInit {
	isLaoder: Boolean;
	isPatientList: Boolean;

	@select((s: AppState) => s.auth.userData) userData$: Observable<Object>;
	@select((s: AppState) => s.auth.errorMessage) errorMessage$: Observable<string>;
	@select((s: AppState) => s.patient.patientData) patientData$: Observable<Array<any>>;
	@select((s: AppState) => s.patient.patientForm) patientForm$: Observable<Array<any>>;
	@select((s: AppState) => s.patient.patientUids) patientUids$: Observable<Array<any>>;
	@select((s: AppState) => s.patient.isLoading) isLoading$: Observable<Boolean>;
	@select((s: AppState) => s.patient.isPatientList) isPatientList$: Observable<Boolean>;

	constructor(public navCtrl: NavController,
		private ngRedux: NgRedux<AppState>) { }

	ngOnInit() {

		this.isPatientList$.subscribe((data) => {
			if (data) {
				this.isPatientList = data
			}
		})
		this.isLoading$.subscribe((data) => {
			if (data) {
				this.isLaoder = data
			}
		})
		this.patientForm$.subscribe((data) => {

			if (data) {
				this.ngRedux.dispatch({
					type: GET_PATIENT
				});
			}
		})

		this.ngRedux.dispatch({
			type: GET_REALTIME_UPDATE
		})

		this.ngRedux.dispatch({
			type: GET_PATIENT
		})

		this.patientUids$.subscribe((data) => {
			// console.log(data);			
		})

		this.patientData$.subscribe((data) => {
			// console.log('patient data',data);
		})

		this.userData$.subscribe((data) => {
			if (data) {

				this.ngRedux.dispatch({
					type: SET_DATA_LOCALLLY,
					payload: data,
				})
			}
		});

		this.errorMessage$.subscribe((data) => {
			if (data) {

			}
		})
	}

	add() {
		this.navCtrl.push(PatientFormPage)
	}

	itemTapped(item, index) {
		this.navCtrl.push(PatientDetailsPage, {
			item,
			index
		})
	}

	logout() {
		this.ngRedux.dispatch({
			type: LOGOUT,
			navCtrl: () => this.navCtrl.push(LoginPage)
		})
	}
}
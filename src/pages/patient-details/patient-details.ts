import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { PatientEpic } from '../../epics/patient';
import { NgRedux, select } from "ng2-redux";
import { AppState } from "../../reducers/rootReducer";
import { DELETE, EDIT } from "../../actions/patient";
import { Http, Headers } from "@angular/http";
import { Observable } from "rxjs";


@IonicPage()
@Component({
	selector: 'page-patient-details',
	templateUrl: 'patient-details.html',
})
export class PatientDetailsPage {
	selectedItem: any;
	selectedIndex: number;
	isEdit = false;
	isEditDetails = true;


	genders = [
		{ value: 'male', viewValue: 'Male' },
		{ value: 'female', viewValue: 'Female' }
	];

	constructor(public navCtrl: NavController, public navParams: NavParams,
		private fb: FormBuilder,
		private http: Http,
		private ngredux: NgRedux<AppState>) {

		this.selectedItem = navParams.get('item');
		this.selectedIndex = navParams.get('ndex')
	}


	editPatient() {
		this.ngredux.dispatch({
			type: EDIT,
			payload: this.selectedItem
		})
		this.isEditDetails = true;
		this.isEdit = false;

	}

	showItem(patientData) {
		this.isEdit = false;
		this.isEditDetails = true;
	}
	deletePatient(selectedItem) {
		this.ngredux.dispatch({
			type: DELETE,
			payload: selectedItem,
			navCtrl: () => this.navCtrl.pop()
		})
	}
	edit() {
		this.isEdit = true;
		this.isEditDetails = false;
	}
	ionViewDidLoad() {
		console.log('ionViewDidLoad PatientDetailsPage');
	}

}
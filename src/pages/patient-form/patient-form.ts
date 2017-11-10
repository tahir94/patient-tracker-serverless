import { Component,OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NgRedux } from "ng2-redux";
import { AppState } from "../../reducers/rootReducer";
import { ADD_PATIENT } from "../../actions/patient";
import { AngularFireAuth } from "angularfire2/auth";
/**
 * Generated class for the PatientFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-patient-form',
  templateUrl: 'patient-form.html',
})
export class PatientFormPage implements OnInit {
	patientForm : FormGroup;

	genders = [
		{ value: 'male', viewValue: 'Male' },
		{ value: 'female', viewValue: 'Female' }
	]

  constructor( private fb: FormBuilder,public navCtrl: NavController,
			  public navParams: NavParams,
			 private ngRedux : NgRedux<AppState>,
			 private afAuth : AngularFireAuth) {
				
  }

  ngOnInit(){
	this.patientForm = this.fb.group({

		patientName: [null, Validators.required],
		patientAge: [null, Validators.required],
		patientAddress: [null, Validators.required],
		gender: [null, Validators.required]
	})
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PatientFormPage');
  }

  addPatient(){
	 this.ngRedux.dispatch({
		 type : ADD_PATIENT,
		 payload : this.patientForm.value,
		 navCtrl : () => this.navCtrl.pop() 
	 })
	//  this.patientForm.reset();
  }

  

}
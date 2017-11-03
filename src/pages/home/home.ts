import { Component,OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PatientFormPage } from "../patient-form/patient-form";
import { NgRedux,select } from "ng2-redux";
import { AppState } from "../../reducers/rootReducer";
import { Observable } from "rxjs";

import { GET_PATIENT } from "../../actions/patient";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
	@select((s : AppState)=>s.auth.userData) userData$ : Observable<Object>;
	@select((s : AppState)=>s.auth.errorMessage) errorMessage$ : Observable<string>;
	@select((s : AppState)=>s.patient.patientData) patientData$ : Observable<Array<any>>;

  constructor(public navCtrl: NavController,
			 private ngRedux : NgRedux<AppState>) {

  }

  ngOnInit(){
	console.log('HOME LOG!!');
	
		this.ngRedux.dispatch({
			type : GET_PATIENT
		})

		this.patientData$.subscribe((data)=>{
			console.log('patient data',data);
			
		})

	  this.userData$.subscribe((data)=>{
		if(data){
			console.log(data);
		}
	  });

	  this.errorMessage$.subscribe((data)=>{
		if(data){
			console.log(data);
		}
	  })
  }
add(){
this.navCtrl.push(PatientFormPage)
}



}

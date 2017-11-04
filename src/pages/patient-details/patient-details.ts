import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { PatientEpic } from '../../epics/patient';
import { NgRedux, select } from "ng2-redux";
import { AppState } from "../../reducers/rootReducer";
import { DELETE,EDIT } from "../../actions/patient";
import { Http, Headers } from "@angular/http";
import { Observable } from "rxjs";

/**
 * Generated class for the PatientDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-patient-details',
  templateUrl: 'patient-details.html',
})
export class PatientDetailsPage {
  selectedItem: any;
	selectedIndex: number;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private fb: FormBuilder,
		          private http: Http,
		          private ngredux: NgRedux<AppState>) {
                
                this.selectedItem = navParams.get('item');
                this.selectedIndex = navParams.get('ndex')
  }
  isPatientEdit = false;
//   isPatientEdit(index){
// 	console.log(index);
// 	if(index){
// 		return true;
// 	}
//   }
edit(){
	this.isPatientEdit = true;
}
  editPatient(shwoItem,editItem,userId){
	  console.log(shwoItem);
	  
let editObj = {
	editItem : editItem,
	userId : userId
}
console.log(editObj);


	this.ngredux.dispatch({
		type : EDIT,
		payload : editObj
	})
  }

  showItem(patientData){
	  console.log(patientData);
	  
	 this.isPatientEdit = false; 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PatientDetailsPage');
  }

}

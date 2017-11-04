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

  editPatient(editItem){

	this.ngredux.dispatch({
		type : EDIT,
		payload : editItem
	})
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PatientDetailsPage');
  }

}

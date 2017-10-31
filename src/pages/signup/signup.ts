import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NgRedux, select } from "ng2-redux";
import { AppState } from "../../reducers/rootReducer";
import { Http, Headers } from "@angular/http";
import { Observable } from "rxjs";
import { SIGNUP } from "../../actions/auth";
import { HomePage } from "../home/home";
// import { EmailValidator } from '../../validators/email';
/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

	signupForm: FormGroup;
	
	  constructor(private fb: FormBuilder,
		private ngRedux: NgRedux<AppState>,
		private navCtrl: NavController) {
		// this.signupForm = this.fb.group({
		//   userName: '',
		//   userEmail: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
		//   userPassword: [null, Validators.compose([Validators.minLength(6), Validators.required])]
		// })
		this.signupForm = this.fb.group({
			userName: '',
			userEmail: '',
			userPassword: ''
		  })
	  }
	
	  signup() {
		this.ngRedux.dispatch({
		  type: SIGNUP,
		  payload: this.signupForm.value,
		  navCtrl: () => this.navCtrl.push(HomePage),
		})
		this.signupForm.reset();
	  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

}

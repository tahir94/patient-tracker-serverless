import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NgRedux, select } from "ng2-redux";
import { AppState } from "../../reducers/rootReducer";
import { Http, Headers } from "@angular/http";
import { Observable } from "rxjs";
import { SignupPage } from "../signup/signup";
import { LOGIN, GET_DATA_LOCALLY } from "../../actions/auth";
import { HomePage } from "../home/home";
// import { EmailValidator } from '../../validators/email';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

	loginForm: FormGroup;
    constructor(private fb: FormBuilder,
        private navCtrl: NavController,
        private ngRedux: NgRedux<AppState>) {

        // this.ngRedux.dispatch({
        //     type: GET_DATA_LOCALLY,
        //     navCtrl: () => this.navCtrl.push(HomePage)
		// })
		
        // this.loginForm = this.fb.group({
        //     userEmail: [null, Validators.compose([Validators.required, EmailValidator.isValid])],
        //     userPassword: [null, Validators.compose([Validators.minLength(6), Validators.required])]
		// })
		this.loginForm = this.fb.group({
			userEmail : '',
			userPassword : ''
		})
    }

    login() {
        this.ngRedux.dispatch({
            type: LOGIN,
            payload: this.loginForm.value,
            navCtrl: () => this.navCtrl.push(HomePage)
        })
        this.loginForm.reset()
    }
    goToSignup() {
        this.navCtrl.push(SignupPage)
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}

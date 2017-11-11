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
import { EmailValidator } from '../../validators/email';

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})

export class LoginPage {
    @select((s: AppState) => s.auth.isLoggedIn) isLoggedIn$: Observable<Boolean>;
    @select((s: AppState) => s.patient.isLoading) isLoading$: Observable<Boolean>;
    loginForm: FormGroup;
    constructor(private fb: FormBuilder,
        private navCtrl: NavController,
        private ngRedux: NgRedux<AppState>) {
        this.isLoading$.subscribe((data) => {
            // console.log(data);

        })
        this.isLoggedIn$.subscribe((data) => {
            // console.log(data);

        })
        this.ngRedux.dispatch({
            type: GET_DATA_LOCALLY,
            navCtrl: () => this.navCtrl.push(HomePage)
        })

        this.loginForm = this.fb.group({
            userEmail: [null, Validators.compose([Validators.required, EmailValidator.isValid])],
            userPassword: [null, Validators.compose([Validators.minLength(6), Validators.required])]
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

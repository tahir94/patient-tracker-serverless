import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';


// component imports
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PatientFormPage } from "../pages/patient-form/patient-form";
import { LoginPage } from "../pages/login/login";
import { SignupPage } from "../pages/signup/signup";

// redux imports
import { combineReducers } from 'redux'
import { NgRedux, NgReduxModule } from 'ng2-redux';
import { RootReducer, AppState, INITIAL_STATE } from '../reducers/rootReducer';
import { createEpicMiddleware } from 'redux-observable';
import { PatientEpic } from '../epics';
import { AuthEpic } from '../epics';

export const firebaseConfig = {
	apiKey: "AIzaSyCAyEGLfGYJ0SOZsB1a16vCAt4LLDFYeuY",
		authDomain: "patient-tracker-b35bc.firebaseapp.com",
		databaseURL: "https://patient-tracker-b35bc.firebaseio.com",
		projectId: "patient-tracker-b35bc",
		storageBucket: "patient-tracker-b35bc.appspot.com",
		messagingSenderId: "929949000487"
  };

@NgModule({
  declarations: [
    MyApp,
	HomePage,
	PatientFormPage,
	LoginPage,
	SignupPage
  ],
  imports: [
    BrowserModule,
	IonicModule.forRoot(MyApp),
	NgReduxModule,
	HttpModule,
	AngularFireAuthModule,
	AngularFireDatabaseModule,
	AngularFireModule.initializeApp(firebaseConfig),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
	HomePage,
	PatientFormPage,
	LoginPage,
	SignupPage
  ],
  providers: [
	PatientEpic,
	AuthEpic,
    StatusBar,
	SplashScreen,
	AngularFireDatabase,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
	constructor(private ngRedux: NgRedux<AppState>,
		private patientEpic: PatientEpic,
		private authEpic : AuthEpic){

			const middleware = [
				createEpicMiddleware(this.patientEpic.Patient),
				createEpicMiddleware(this.authEpic.Login),
				createEpicMiddleware(this.authEpic.Signup),
			]

			

			ngRedux.configureStore(RootReducer, INITIAL_STATE, middleware)
	}
	
}


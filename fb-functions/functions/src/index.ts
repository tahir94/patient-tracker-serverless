import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import * as AddPatient from './lib/addPatient'



// var config = {
// 	apiKey: "AIzaSyCAyEGLfGYJ0SOZsB1a16vCAt4LLDFYeuY",
// 	authDomain: "patient-tracker-b35bc.firebaseapp.com",
// 	databaseURL: "https://patient-tracker-b35bc.firebaseio.com",
// 	projectId: "patient-tracker-b35bc",
// 	storageBucket: "patient-tracker-b35bc.appspot.com",
// 	messagingSenderId: "929949000487"
// };


admin.initializeApp(functions.config().firebase)
import { listener } from './lib/addPatient';
import { signupListener,loginListener } from "./lib/auth";
export const addPatient = listener;
export const signup = signupListener;
export const login = loginListener;
// import db from './db'
export const firestore = functions.firestore;











// export const makeUpperCase = UpCaseMessages.listener

// admin.initializeApp(functions.config().firestore);
// export const firestore = admin.firestore();


//   firestore.initializeApp(config)

// admin.initializeApp(functions.config().firestore);
// admin.initializeApp(config);
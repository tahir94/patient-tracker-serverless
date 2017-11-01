import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { firestore } from "../";
import { AngularFireAuth } from "angularfire2/auth";
const userRef = admin.firestore().collection('users');


export class AuthClass {
currentUid : any;
	constructor(public afAuth : AngularFireAuth){}
	static Login(){

	}
	static Signup(userData : any){
		return new Promise((resolve,reject)=>{

			userRef.doc(userData.uid).set({
				userEmail :userData.userEmail,
				userName  : userData.userName,
				userPassword :userData.userPassword
			}).then((resolve)=>{
				console.log('signup data success');
				
			}).catch((reject)=>{
				console.log('signup data reject');
				
			})		

		})
	}

	static OnPatientSuccess(usersUids : any){
		return new Promise((resolve,reject)=>{
			// userRef.doc(usersUids.user_id).update({patients : [{patientUids : usersUids.push_id,when: new Date()}]},{ merge: true })
			userRef.doc(usersUids.user_id).collection('patients').add({patientsUids : usersUids.push_id})
			// { sharedWith: [{ who: "third@test.com", when: new Date() }] },
			// { merge: true }
		})
	
	}
}
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { firestore } from "../";
import { AngularFireAuth } from "angularfire2/auth";
const userRef = admin.firestore().collection('users');
const patientRef = admin.firestore().collection('doctorPatientsUids');
const docRef = admin.firestore().collection("patients");

export class AuthClass {
currentUid : any;
	constructor(public afAuth : AngularFireAuth){}
	static Login(currentUserUid : Object){
		return new Promise((resolve,reject)=>{
			console.log('check type of',typeof currentUserUid);
			console.log('check type of',currentUserUid);
			
			userRef.doc(currentUserUid.uid).get().then((doc)=>{
				console.log('db uid log',currentUserUid);
				if(doc.exists){
					console.log(doc.data());
					resolve(doc.data())
				}
				else { 
					console.log('no document exists');
				}
				
			}).catch((error)=>{
				console.log('doc error',error);
				reject(error)
			})
		})
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
			docRef.doc(usersUids.push_id).update({userId : usersUids.push_id})
			patientRef.doc(usersUids.user_id).update({[usersUids.push_id]: true})
			.then(success=>{
				console.log('ON PAT SUCC: DB',success);
				
				resolve(success)
				
			})
			.catch(a => {
			
					patientRef.doc(usersUids.user_id).set({[usersUids.push_id]: true})					
					console.log('ON PAT CATCH: DB',a);
					reject(a)
			
				})
		})
	
	}
}
import * as admin from 'firebase-admin';
const functions = require('firebase-functions');
import { firestore }  from  '../'


const docRef = admin.firestore().collection("users");

export class PatientClass {								


	static addPatient(getData: any) {
		return new Promise((resolve, reject) => {
			
			console.log('GET dATA', getData);
			
					docRef.doc().set(getData).then(() => {
						console.log('Status Saved!');
						resolve('success')
					}).catch((error) => {
						console.log('got an error');
						reject('failed')
					})
			
		  });
		}
	}
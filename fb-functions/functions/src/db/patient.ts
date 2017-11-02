import * as admin from 'firebase-admin';
const functions = require('firebase-functions');
import { firestore } from '../';




const docRef = admin.firestore().collection("patients");

export class PatientClass {


	static addPatient(getData: any) {
		return new Promise((resolve, reject) => {

			console.log('GET dATA', getData);

			docRef.add({
				patientName: getData.patientName,
				patientAge: getData.patientAge,
				patientAddress: getData.patientAddress,
				gender: getData.gender
			}).then((success) => {
				console.log('Status Saved!');
				resolve({'push_id': success.id, 'user_id': getData.userId})
			}).catch((error) => {
				console.log('got an error');
				reject('failed')
			})

		});
	}

	static getPatient(currentUserUid : any){
		console.log('db currentUid',currentUserUid);
		
	}
}
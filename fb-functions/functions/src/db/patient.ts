import * as admin from 'firebase-admin';
const functions = require('firebase-functions');
admin.initializeApp(functions.config().firestore);

export class PatientClass {


	static addPatient(getData : any){
		// functions.firestore
		// .document('patients')
		// .onCreate((getData : any) => {
		// let name = getData.data.dat
		// })
	}
}
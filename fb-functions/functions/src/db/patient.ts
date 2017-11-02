import * as admin from 'firebase-admin';
const functions = require('firebase-functions');
import { firestore } from '../';




const docRef = admin.firestore().collection("patients");
const patientRef = admin.firestore().collection('doctorPatientsUids');

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
				resolve({ 'push_id': success.id, 'user_id': getData.userId })
			}).catch((error) => {
				console.log('got an error');
				reject('failed')
			})

		});
	}

	static getPatient(currentUserUid: any) {
		return new Promise((resolve, reject) => {

			console.log('db currentUid', currentUserUid);
			patientRef.doc(currentUserUid).get().then((doc => {
				if (doc.exists) {
					console.log('document data', doc.data());
					resolve(doc.data())
				}
				else {
					console.log('no such document');

				}
			})).catch((error) => {
				console.log('error document', error);
				reject(error)
			})
			// .then((success)=>{
			// 	console.log(success);

			// }).catch((error)=>{
			// 	reject()
			// })

		})
	}

	static fetchPatients(patientUids: any) {
		// console.log('db fetch!', patientUids);
		return new Promise((resolve, reject) => {

			// docRef.get().then((doc)=>{

			docRef.get().then((querySnapshot) => {
				let pat1: any = []
				querySnapshot.forEach((doc) => {
					// console.log(doc.id, " =>------ ", doc.data());
					// console.log('in forEach uids', patientUids);
					let fil = patientUids.split(',').map((abc: any) => {
						if (abc.toLowerCase() === doc.id.toLowerCase()) {
							console.log("doctadsad ", doc.data())
							return doc.data()
						}
					})
					if (fil.length) {
						pat1.push(...fil)
					}
					// if (doc.id == patientUids) {
					// 	console.log('if uids', doc.id, "=====", doc.data());

					// }
					console.warn(' ======----=======----------=== ', fil)
				});
				console.log('#########################', pat1)
				resolve(pat1)
			}).catch((error) => {
				console.log('error in fetch doc', error);
				reject(error)
			})
			// if(doc.docs){
			// 	console.log('fetch doc data',doc.docs);
			// 	resolve(doc.docs)					
			// }
			// else {

			// 	console.log('nothing in fetch doc', doc.docs);					
			// }
		})
		// })


	}
}
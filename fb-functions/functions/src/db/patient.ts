import * as admin from 'firebase-admin';
const functions = require('firebase-functions');
import { firestore } from '../';
import { Observable } from "rxjs";



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
		return new Promise((resolve, reject) => {
			docRef.get().then(snapshot => {
				console.log('snapshot', snapshot)
				let arr1: any = []
				let patArray: any = []
				patArray = patientUids.split(',')
				snapshot.forEach((doc) => {
					// const patientIdArray = [patientUids];

					// patientUids.forEach((param : any)=>{
					// 	console.log('paramm!',param);

					// })

					console.log('[doc id]', doc.id);
					console.log('[pat arr]', patArray);
					patArray.forEach((param: any) => {
						console.log('param2', param);
						if (doc.id == param) {
							// let currentPatients : any = [];
							// currentPatients.push(doc.data())
							arr1.push(doc.data())
						}
					})
					// resolve(patArray)
					// console.log(doc.data());
				})
				console.info('RESOLVE :::---::: ', arr1);
				resolve(arr1)

			}).catch(error => {
				reject(error)
			})
		})
	}

	// 	static fetchPatients(patientUids: any) {

	// 		// ********************************
	// 		// console.log('db fetch!', patientUids);
	// 		// ********************************

	// 		return new Promise((resolve, reject) => {

	// // ********************************
	// 			// docRef.get().then((doc)=>{
	// // ********************************

	// 			docRef.get().then((querySnapshot) => {
	// 				let pat1: any = []
	// 				querySnapshot.forEach((doc) => {

	// 					// ********************************
	// 					// console.log(doc.id, " =>------ ", doc.data());
	// 					// console.log('in forEach uids', patientUids);
	// 					// ********************************

	// 					let fil = patientUids.split(',').map((abc: any) => {
	// 						if (abc.toLowerCase() === doc.id.toLowerCase()) {
	// 							console.log("doctadsad ", doc.data())
	// 							return doc.data()
	// 						}
	// 					})
	// 					if (fil.length) {
	// 						pat1.push(...fil)
	// 					}

	// 					// ********************************
	// 					// if (doc.id == patientUids) {
	// 					// 	console.log('if uids', doc.id, "=====", doc.data());

	// 					// }
	// 					// ********************************

	// 					console.warn(' ======----=======----------=== ', fil)
	// 				});
	// 				console.log('#########################', pat1)
	// 				resolve(pat1)
	// 			}).catch((error) => {
	// 				console.log('error in fetch doc', error);
	// 				reject(error)
	// 			})

	// 			// ********************************
	// 			// if(doc.docs){
	// 			// 	console.log('fetch doc data',doc.docs);
	// 			// 	resolve(doc.docs)					
	// 			// }
	// 			// else {

	// 			// 	console.log('nothing in fetch doc', doc.docs);					
	// 			// }
	// 			// ********************************

	// 		})

	// 		// ********************************
	// 		// })
	// 		// ********************************

	// 	}
}
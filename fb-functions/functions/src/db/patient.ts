import * as admin from 'firebase-admin';
const functions = require('firebase-functions');
import { firestore } from '../';
import { Observable } from "rxjs";



const docRef = admin.firestore().collection("patients");
const patientRef = admin.firestore().collection('doctorPatientsUids');
const patientRef2 = admin.firestore().collection('doctorPatientsUids');


export class PatientClass {
	//patientRef2: Angu

	static addPatient(getData: any) {
		return new Promise((resolve, reject) => {

			console.log('ADD PAT: DB', getData);

			docRef.add({
				patientName: getData.patientName,
				patientAge: getData.patientAge,
				patientAddress: getData.patientAddress,
				gender: getData.gender,
			}).then((success) => {
				console.log('PAT SUCCESS: DB');
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
				else if(!doc.data()){
					console.log('no such document');
					reject('no such document')
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
				snapshot.docChanges.forEach((doc) => {

					console.log('[doc id]', doc.doc.id);
					console.log('[pat arr]', patArray);
					patArray.forEach((param: any) => {
						console.log('param2', param);
						if (doc.doc.id == param) {
							arr1.push(doc.doc.data())
						}
					})
				})
				console.info('RESOLVE :::---::: ', arr1);
				resolve(arr1)

			}).catch(error => {
				reject(error)
			})
		})
	}

	static editListener(editData: any) {
		console.log('qwert', editData);

		return new Promise((resolve, reject) => {
			admin.firestore()
				.collection("patients")
				.doc(editData.userId)
				.update(editData)
				.then(res => {
					resolve(res)
				})
				.catch(e => {
					reject(e)

				})
			// if (editData.hasOwnProperty('patientName')) {
			// 	console.log('ccc');

			// 	console.log('hasOwnProp', editData.hasOwnProperty('patientName'));
			// 	docRef.doc(editData.userId).update({ patientName: editData.patientName }).then(success => {	

			// 		resolve(success)
			// 	}).catch(error => {
			// 		reject(error)
			// 	});

			// }
			// else {
			// 	console.log('hasOwnProp', editData);

			// 	docRef.doc(editData.userId).update({ patientAge: editData.patientAge }).then(success => {

			// 		resolve(success)
			// 	}).catch(error => {
			// 		reject(error)
			// 	})

			// }
			// else if (editData.hasOwnProperty('patientAddress')) {

			// 	docRef.doc(editData.userId).update({ patientName: editData.patientAddress }).then(success => {

			// 		resolve(success)
			// 	}).catch(error => {
			// 		reject(error)
			// 	})

			// }
			// else {

			// 	docRef.doc(editData.userId).update({ patientName: editData.gender }).then(success => {

			// 		resolve(success)
			// 	}).catch(error => {
			// 		reject(error)
			// 	})

			// }


		})
		// .catch((error)=>{
		// 	reject('error edit db')
		// })
	}

	static deletePatient(deleteData: any) {
		return new Promise((resolve,reject)=>{
			patientRef.doc(deleteData.currentUserId).get().then(doc =>{
			// ******************************			
				for(let abc in doc.data()){
					console.log('abcc',abc);
					if(abc == deleteData.userId){
						patientRef2.doc(deleteData.currentUserId).update(abc,false)
					}
				}
			// ******************************
			
			//////////////////////////////// 
			// Object.keys(doc.data()).forEach((key,index)=>{
			// 		console.log('KEYY',key.valueOf());
			// 		console.log('INDEX',index);
			// 		if(key == deleteData.userId){
			// 			let ref = 'doctorPatientsUids/'+deleteData.userId;
			// 			const patientRef2 = admin.firestore().doc(ref);
			// 			patientRef2.update(true);
			// 			console.log('current uid',deleteData.currentUserId);
			// 			//patientRef2.
			// 			// delete key
			// 			// delete deleteData.userId;
			// 			// deleteData.remove();
			// 			// patientRef2.doc.
						
			// 		}
					
			// 	})

				//////////////////////////////// 
				// for(let abc in doc.data()){
					// console.log('abcc',doc.data()[abc]);
						
					// if(doc.data()[abc].hasOwnProperty(abc)){
					// 	console.log('abcc',abc);
						
					// }
					// console.log(abc[doc.data()]);
					
				// }
				
			})
			// docRef.doc(deleteData.userId).get().then(success=>{
			// 	console.log('delete succ!!',success);
			// 	resolve(success);
			// }).catch(error=>{
			// 	 console.log('del err!',error);
			// 	 reject(error)
			// })
			docRef.doc(deleteData.userId).delete()
			.then(success=>{
				patientRef.doc(deleteData.currentUserId)
				console.log('delete success',success);
				resolve(success);
				
			}).catch(error=>{
				console.log('delete error',error);	
				reject(error);			
			})
		})	
	}



 static realTimePatient(){
	 return new Promise((resolve,reject)=>{
		docRef.doc()
		.onSnapshot((doc)=> {
			console.log("Current data: ", doc && doc.data())
		})
		
	 }).then(success=>{
		 console.log('success realtime',success);
		 
	 }).catch(error=>{
		 console.log('error on realtime');
		 
	 })
	//  .catch(error =>{
	// 	 return reject()
	//  })
 }

	// static realtimeChages(a: Function, deleteData: any){
	// 	docRef.doc(deleteData.userId).get(

	// 	)

	// }



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
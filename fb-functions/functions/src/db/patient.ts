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

			docRef.add({
				patientName: getData.patientName,
				patientAge: getData.patientAge,
				patientAddress: getData.patientAddress,
				gender: getData.gender,
			}).then((success) => {
				resolve({ 'push_id': success.id, 'user_id': getData.userId })
			}).catch((error) => {
				reject('failed')
			})

		});
	}

	static getPatient(currentUserUid: any) {
		return new Promise((resolve, reject) => {
			
			patientRef.doc(currentUserUid).get().then((doc => {
				if (doc.exists) {
					resolve(doc.data())
				}
				else {
					
					reject(doc.data())
				}				
			})).catch((error) => {
				reject(error)
			})
		})
	}

	static fetchPatients(patientUids: any) {
		return new Promise((resolve, reject) => {
			
			docRef.get().then(snapshot => {
				let arr1: any = []
				let patArray: any = []
				patArray = patientUids.split(',')
				snapshot.docChanges.forEach((doc) => {
					patArray.forEach((param: any) => {
						if (doc.doc.id == param) {
							arr1.push(doc.doc.data())
						}
					})
				})
				resolve(arr1)

			}).catch(error => {
				reject(error)
			})
		})
	}

	static editListener(editData: any) {

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
		})
	}

	static deletePatient(deleteData: any) {
		return new Promise((resolve,reject)=>{
			patientRef.doc(deleteData.currentUserId).get().then(doc =>{		
				for(let abc in doc.data()){
					if(abc == deleteData.userId){
						patientRef2.doc(deleteData.currentUserId).update(abc,false)
					}
				}
			})
			docRef.doc(deleteData.userId).delete()
			.then(success=>{
				patientRef.doc(deleteData.currentUserId)
				resolve(success);
				
			}).catch(error=>{	
				reject(error);			
			})
		})	
	}
}
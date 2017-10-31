import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { firestore } from "../";

const userRef = admin.firestore().collection('users');

export class AuthClass {
	static Login(){

	}
	static Signup(){
		
	}
}
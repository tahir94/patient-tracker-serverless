import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import * as AddPatient from './lib/addPatient'

admin.initializeApp(functions.config().firebase)
import { listener, getPatientListener, fetchPatientsListener, editListener, deleteListener } from './lib/addPatient';

import { signupListener, loginListener } from "./lib/auth";
// export { signupListener,loginListener,checkUserListener }
export const addPatient = listener;
export const getPatients = getPatientListener;
export const fetchPatients = fetchPatientsListener;
export const editPatient = editListener;
export const deletePatient = deleteListener;
export const signup = signupListener;
export const login = loginListener;
export const firestore = functions.firestore;





import * as functions from 'firebase-functions';
import { Request, Response } from "express";
import * as admin from 'firebase-admin'
import * as _cors from 'cors';
import { PatientClass } from "../../db/patient";
import { AuthClass } from "../../db/auth";

let cors = _cors({ origin: true });

export const listener = functions.https.onRequest(async (req: Request, res: Response) => {
	
	
	cors(req, res, () => {
		console.log('check',req.body);
		
		PatientClass.addPatient(req.body).then((success)=>{
			console.log('patient success',success.user_id);
			
			AuthClass.OnPatientSuccess(success)
			
		}).catch((err)=>{
			console.log(err);
			
		})
		res.send('hello world')
	})
})

export const getPatientListener = functions.https.onRequest(async (req : Request,res : Response)=> {
	cors(req,res, () =>  {
		console.log('server get func !', req.query.uid);
		PatientClass.getPatient(req.query.uid).then((success)=>{
			console.log('get server success',success);
			res.send(success);
		}).catch((error)=>{
			console.log('get server error',error);
			res.send(error);
		})

	})
})

export const fetchPatientsListener = functions.https.onRequest(async (req : Request,res : Response)=>{
	cors(req,res, () => {
		console.log('server fetch patients',req.query.patientUids);
		PatientClass.fetchPatients(req.query.patientUids).then((success : any)=>{
			console.log('fetch success3',success);
			// success.forEach((element : any)=> {
			// 	console.log('eleee',element);
				
			// });
			res.send(success);	
		}).catch((error : any)=>{
			console.log('fetch error',error);
			res.send(error)
			
		})
	})
})

export const editListener = functions.https.onRequest(async (req : Request, res :Response)=>{
	cors(req,res, ()=>{
		console.log('server edit',req.body);
		
		PatientClass.editListener(req.body).then((success)=>{
			console.log('success edit server',success);
			res.send(success)
		}).catch((error)=>{
			console.log('error edit server',error);
			res.send(error)
		})
	})
})

import * as functions from 'firebase-functions';
import { Request, Response } from "express";
import * as admin from 'firebase-admin'
import * as _cors from 'cors';
import { PatientClass } from "../../db/patient";
import { AuthClass } from "../../db/auth";

let cors = _cors({ origin: true });

export const listener = functions.https.onRequest(async (req: Request, res: Response) => {


	cors(req, res, () => {
		console.log('ADD PAT: SERVER', req.body);

		PatientClass.addPatient(req.body).then((success) => {
			console.log('ADD PAT SUCC: SERVER ', success.user_id);

			AuthClass.OnPatientSuccess(success).then((succ)=>{
				console.log('SUCC ON PAT: SERVER ',succ);
				res.send(succ)
			}) .catch(a=>{
				console.log('ERR ON PAT: SERVER ',a);
				res.send(a)
			})

			// res.send(success)
		}).catch((err) => {
			console.log(err);
			res.send(err)
		})
	})
})

export const getPatientListener = functions.https.onRequest(async (req: Request, res: Response) => {
	cors(req, res, () => {
		console.log('server get func !', req.query.uid);
		PatientClass.getPatient(req.query.uid).then((success) => {
			console.log('get server success', success);
			res.send(success);
		}).catch((error) => {
			console.log('get server error', error);
			res.send(error);
		})

	})
})

export const fetchPatientsListener = functions.https.onRequest(async (req: Request, res: Response) => {
	cors(req, res, () => {
		console.log('server fetch patients', req.query.patientUids);
		PatientClass.fetchPatients(req.query.patientUids).then((success: any) => {
			console.log('fetch success3', success);
			// success.forEach((element : any)=> {
			// 	console.log('eleee',element);

			// });
			res.send(success);
		}).catch((error: any) => {
			console.log('fetch error', error);
			res.send(error)

		})
	})
})

export const editListener = functions.https.onRequest(async (req: Request, res: Response) => {
	cors(req, res, () => {
		console.log('server edit', req.body);

		PatientClass.editListener(req.body).then((success) => {
			console.log('success edit server', success);
			res.send(success)
		}).catch((error) => {
			console.log('111111111111111111111', req.body);
			console.log('error edit server', error);
			res.send(error)
		})
	})
	
})

export const deleteListener = functions.https.onRequest(async(req : Request,res : Response)=>{
	cors(req,res, ()=>{
	console.log('delete req',req.body);	
	 PatientClass.deletePatient(req.body).then(success=>{
		 console.log(success);
		 res.send(success);
		//  if(success){
		// 	cors(req, res, () => {
		// 		console.log('server get func !', req.query.uid);
		// 		PatientClass.getPatient(req.query.uid).then((success) => {
		// 			console.log('get server success', success);
		// 			res.send(success);
		// 		}).catch((error) => {
		// 			console.log('get server error', error);
		// 			res.send(error);
		// 		})
		
		// 	})
		// 	//  res.redirect('/fetchPatients')
		// 	//  PatientClass.realtimeChages(((a: any) => res.send(a)), req.body)
		//  }
		 

	 }).catch(error => {
		 console.log(error);
		 res.send(error);
		 
	 })	
	})
})
 
export const realtimePatientListener = functions.https.onRequest(async(req:Request,res: Response)=>{
cors(req,res,()=>{
	PatientClass.realTimePatient().then(success=>{
		console.log('success server realtime',success);
		
	}).catch(error=>{
		console.log('error server realtime',error);
		
	})
})
})

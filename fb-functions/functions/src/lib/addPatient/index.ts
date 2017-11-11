import * as functions from 'firebase-functions';
import { Request, Response } from "express";
import * as admin from 'firebase-admin'
import * as _cors from 'cors';
import { PatientClass } from "../../db/patient";
import { AuthClass } from "../../db/auth";

let cors = _cors({ origin: true });

export const listener = functions.https.onRequest(async (req: Request, res: Response) => {


	cors(req, res, () => {


		PatientClass.addPatient(req.body).then((success) => {
			AuthClass.OnPatientSuccess(success).then((succ) => {
				res.send(succ);

			}).catch(a => {
				res.send(a)
			})
		}).catch((err) => {
			res.send(err)
		})
	})
})

export const getPatientListener = functions.https.onRequest(async (req: Request, res: Response) => {
	cors(req, res, () => {
		PatientClass.getPatient(req.query.uid).then((success) => {
			res.send(success);

		}).catch((error) => {
			res.send(error);
		})

	})
})

export const fetchPatientsListener = functions.https.onRequest(async (req: Request, res: Response) => {
	cors(req, res, () => {
		PatientClass.fetchPatients(req.query.patientUids).then((success: any) => {

			res.send(success);
		}).catch((error: any) => {
			res.send(error)

		})
	})
})

export const editListener = functions.https.onRequest(async (req: Request, res: Response) => {
	cors(req, res, () => {

		PatientClass.editListener(req.body).then((success) => {
			res.send(success)
		}).catch((error) => {
			res.send(error)
		})
	})

})

export const deleteListener = functions.https.onRequest(async (req: Request, res: Response) => {
	cors(req, res, () => {
		PatientClass.deletePatient(req.body).then(success => {
			res.send(success);

		}).catch(error => {
			res.send(error);

		})
	})
})

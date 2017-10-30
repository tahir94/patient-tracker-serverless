import * as functions from 'firebase-functions';
import { Request, Response } from "express";
import * as admin from 'firebase-admin'
import * as _cors from 'cors';
import { PatientClass } from "../../db/patient";
let cors = _cors({ origin: true });

export const listener = functions.https.onRequest(async (req: Request, res: Response) => {
	cors(req, res, () => {
		console.log('check',req.body);
		res.send('hello world')
		PatientClass.addPatient(req.body)
	})
})
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { Request, Response } from 'express';
import * as _cors from 'cors';

import { AuthClass } from "../../db/auth";
let cors = _cors({ origin: true });

export const signupListener = functions.https.onRequest(async (req: Request, res: Response) => {
	cors(req, res, () => {
		console.log('check signup', req.body);
		res.send('signup seccuess');
		AuthClass.Signup(req.body)
			.then((success) => {
				console.log(success)
			})
			.catch((error => {
				console.log(error)
			}))
	})
})

export const loginListener = functions.https.onRequest(async (req: Request, res: Response) => {
	cors(req, res, () => {
		console.log('check login', req.body);
		
		AuthClass.Login(req.body).then((success) => {
			console.log('login success',success)
			res.send(success);
		}).catch((error) => {
			console.log(error)
			res.send(error);
		})
	})
})

// exports.checkUser = functions.auth.user().onCreate(event => {
// 	console.log('event',event)
//   });

export const checkUserListener = functions.auth.user().onCreate(event => {
	console.log('event', event.data)

});

import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { Request,Response } from 'express';
import * as _cors from 'cors';

import {  } from "";
let cors = _cors({origin : true});

export const signupListener = functions.https.onRequest(async (req: Request, res : Response) => {
	cors(req,res,()=>{
		console.log('check signup',req.body);
		res.send('signup seccuess');
		
	})
})

export const loginListener = functions.https.onRequest(async (req: Request, res : Response) => {
	cors(req,res,()=>{
		console.log('check login',req.body);
		res.send('login seccuess');
	})
})
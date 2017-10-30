import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import * as AddPatient from './lib/addPatient'
// import * as UpCaseMessages from './upcase-messages'

admin.initializeApp(functions.config().firebase)

import {listener} from './lib/addPatient'
export const addPatient = listener
// export const makeUpperCase = UpCaseMessages.listener
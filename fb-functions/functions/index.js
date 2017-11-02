(function(e, a) { for(var i in a) e[i] = a[i]; }(this, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("firebase-functions");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("firebase-admin");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const admin = __webpack_require__(1);
const userRef = admin.firestore().collection('users');
const patientRef = admin.firestore().collection('doctorPatientsUids');
class AuthClass {
    constructor(afAuth) {
        this.afAuth = afAuth;
    }
    static Login() {
    }
    static Signup(userData) {
        return new Promise((resolve, reject) => {
            userRef.doc(userData.uid).set({
                userEmail: userData.userEmail,
                userName: userData.userName,
                userPassword: userData.userPassword
            }).then((resolve) => {
                console.log('signup data success');
            }).catch((reject) => {
                console.log('signup data reject');
            });
        });
    }
    static OnPatientSuccess(usersUids) {
        return new Promise((resolve, reject) => {
            // userRef.doc(usersUids.user_id).update({patients : [{patientUids : usersUids.push_id,when: new Date()}]},{ merge: true })
            patientRef.doc(usersUids.user_id).update({ [usersUids.push_id]: true }).catch(a => {
                patientRef.doc(usersUids.user_id).create({ [usersUids.push_id]: true });
            });
        });
    }
}
exports.AuthClass = AuthClass;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const functions = __webpack_require__(0);
const admin = __webpack_require__(1);
// var config = {
// 	apiKey: "AIzaSyCAyEGLfGYJ0SOZsB1a16vCAt4LLDFYeuY",
// 	authDomain: "patient-tracker-b35bc.firebaseapp.com",
// 	databaseURL: "https://patient-tracker-b35bc.firebaseio.com",
// 	projectId: "patient-tracker-b35bc",
// 	storageBucket: "patient-tracker-b35bc.appspot.com",
// 	messagingSenderId: "929949000487"
// };
admin.initializeApp(functions.config().firebase);
const addPatient_1 = __webpack_require__(5);
const auth_1 = __webpack_require__(7);
exports.addPatient = addPatient_1.listener;
exports.getPatients = addPatient_1.getPatientListener;
exports.signup = auth_1.signupListener;
exports.login = auth_1.loginListener;
exports.checkUser = auth_1.checkUserListener;
// import db from './db'
exports.firestore = functions.firestore;
// export const makeUpperCase = UpCaseMessages.listener
// admin.initializeApp(functions.config().firestore);
// export const firestore = admin.firestore();
//   firestore.initializeApp(config)
// admin.initializeApp(functions.config().firestore);
// admin.initializeApp(config); 


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const functions = __webpack_require__(0);
const _cors = __webpack_require__(2);
const patient_1 = __webpack_require__(6);
const auth_1 = __webpack_require__(3);
let cors = _cors({ origin: true });
exports.listener = functions.https.onRequest((req, res) => __awaiter(this, void 0, void 0, function* () {
    cors(req, res, () => {
        console.log('check', req.body);
        patient_1.PatientClass.addPatient(req.body).then((success) => {
            console.log('patient success', success.user_id);
            auth_1.AuthClass.OnPatientSuccess(success);
        }).catch((err) => {
            console.log(err);
        });
        res.send('hello world');
    });
}));
exports.getPatientListener = functions.https.onRequest((req, res) => __awaiter(this, void 0, void 0, function* () {
    cors(req, res, () => {
        console.log('server get func !', req.query.uid);
        patient_1.PatientClass.getPatient(req.query.uid);
        res.send('get patient success');
    });
}));


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const admin = __webpack_require__(1);
const functions = __webpack_require__(0);
const docRef = admin.firestore().collection("patients");
class PatientClass {
    static addPatient(getData) {
        return new Promise((resolve, reject) => {
            console.log('GET dATA', getData);
            docRef.add({
                patientName: getData.patientName,
                patientAge: getData.patientAge,
                patientAddress: getData.patientAddress,
                gender: getData.gender
            }).then((success) => {
                console.log('Status Saved!');
                resolve({ 'push_id': success.id, 'user_id': getData.userId });
            }).catch((error) => {
                console.log('got an error');
                reject('failed');
            });
        });
    }
    static getPatient(currentUserUid) {
        console.log('db currentUid', currentUserUid);
    }
}
exports.PatientClass = PatientClass;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const functions = __webpack_require__(0);
const _cors = __webpack_require__(2);
const auth_1 = __webpack_require__(3);
let cors = _cors({ origin: true });
exports.signupListener = functions.https.onRequest((req, res) => __awaiter(this, void 0, void 0, function* () {
    cors(req, res, () => {
        console.log('check signup', req.body);
        res.send('signup seccuess');
        auth_1.AuthClass.Signup(req.body)
            .then((success) => {
            console.log(success);
        })
            .catch((error => {
            console.log(error);
        }));
    });
}));
exports.loginListener = functions.https.onRequest((req, res) => __awaiter(this, void 0, void 0, function* () {
    cors(req, res, () => {
        console.log('check login', req.body);
        res.send('login seccuess');
    });
}));
// exports.checkUser = functions.auth.user().onCreate(event => {
// 	console.log('event',event)
//   });
exports.checkUserListener = functions.auth.user().onCreate(event => {
    console.log('event', event.data);
});


/***/ })
/******/ ])));
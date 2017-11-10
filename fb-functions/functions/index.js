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
const docRef = admin.firestore().collection("patients");
class AuthClass {
    constructor(afAuth) {
        this.afAuth = afAuth;
    }
    static Login(currentUserUid) {
        return new Promise((resolve, reject) => {
            console.log('check type of', typeof currentUserUid);
            console.log('check type of', currentUserUid);
            userRef.doc(currentUserUid.uid).get().then((doc) => {
                console.log('db uid log', currentUserUid);
                if (doc.exists) {
                    console.log(doc.data());
                    resolve(doc.data());
                }
                else {
                    console.log('no document exists');
                }
            }).catch((error) => {
                console.log('doc error', error);
                reject(error);
            });
        });
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
            docRef.doc(usersUids.push_id).update({ userId: usersUids.push_id });
            patientRef.doc(usersUids.user_id).update({ [usersUids.push_id]: true })
                .then(success => {
                console.log('ON PAT SUCC: DB', success);
                resolve(success);
            })
                .catch(a => {
                patientRef.doc(usersUids.user_id).set({ [usersUids.push_id]: true });
                console.log('ON PAT CATCH: DB', a);
                reject(a);
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
// export { signupListener,loginListener,checkUserListener }
exports.addPatient = addPatient_1.listener;
exports.getPatients = addPatient_1.getPatientListener;
exports.fetchPatients = addPatient_1.fetchPatientsListener;
exports.editPatient = addPatient_1.editListener;
exports.deletePatient = addPatient_1.deleteListener;
exports.realtimePatientChanges = addPatient_1.realtimePatientListener;
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
        console.log('ADD PAT: SERVER', req.body);
        patient_1.PatientClass.addPatient(req.body).then((success) => {
            console.log('ADD PAT SUCC: SERVER ', success.user_id);
            auth_1.AuthClass.OnPatientSuccess(success).then((succ) => {
                console.log('SUCC ON PAT: SERVER ', succ);
                res.send(succ);
            }).catch(a => {
                console.log('ERR ON PAT: SERVER ', a);
                res.send(a);
            });
            // res.send(success)
        }).catch((err) => {
            console.log(err);
            res.send(err);
        });
    });
}));
exports.getPatientListener = functions.https.onRequest((req, res) => __awaiter(this, void 0, void 0, function* () {
    cors(req, res, () => {
        console.log('SERVER GET : UID !', req.query.uid);
        patient_1.PatientClass.getPatient(req.query.uid).then((success) => {
            console.log('SERVER GET : SUCCESS !', success);
            res.send(success);
        }).catch((error) => {
            console.log('SERVER GET : ERROR !', error);
            res.send(error);
        });
    });
}));
exports.fetchPatientsListener = functions.https.onRequest((req, res) => __awaiter(this, void 0, void 0, function* () {
    cors(req, res, () => {
        console.log('SERVER FETCH : UIDS !', req.query.patientUids);
        patient_1.PatientClass.fetchPatients(req.query.patientUids).then((success) => {
            console.log('SERVER FETCH : SUCCESS !', success);
            // success.forEach((element : any)=> {
            // 	console.log('eleee',element);
            // });
            res.send(success);
        }).catch((error) => {
            console.log('SERVER FETCH : ERROR !', error);
            res.send(error);
        });
    });
}));
exports.editListener = functions.https.onRequest((req, res) => __awaiter(this, void 0, void 0, function* () {
    cors(req, res, () => {
        console.log('server edit', req.body);
        patient_1.PatientClass.editListener(req.body).then((success) => {
            console.log('success edit server', success);
            res.send(success);
        }).catch((error) => {
            console.log('111111111111111111111', req.body);
            console.log('error edit server', error);
            res.send(error);
        });
    });
}));
exports.deleteListener = functions.https.onRequest((req, res) => __awaiter(this, void 0, void 0, function* () {
    cors(req, res, () => {
        console.log('delete req', req.body);
        patient_1.PatientClass.deletePatient(req.body).then(success => {
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
        });
    });
}));
exports.realtimePatientListener = functions.https.onRequest((req, res) => __awaiter(this, void 0, void 0, function* () {
    cors(req, res, () => {
        patient_1.PatientClass.realTimePatient().then(success => {
            console.log('success server realtime', success);
        }).catch(error => {
            console.log('error server realtime', error);
        });
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
const patientRef = admin.firestore().collection('doctorPatientsUids');
const patientRef2 = admin.firestore().collection('doctorPatientsUids');
class PatientClass {
    //patientRef2: Angu
    static addPatient(getData) {
        return new Promise((resolve, reject) => {
            console.log('ADD PAT: DB', getData);
            docRef.add({
                patientName: getData.patientName,
                patientAge: getData.patientAge,
                patientAddress: getData.patientAddress,
                gender: getData.gender,
            }).then((success) => {
                console.log('PAT SUCCESS: DB');
                resolve({ 'push_id': success.id, 'user_id': getData.userId });
            }).catch((error) => {
                console.log('got an error');
                reject('failed');
            });
        });
    }
    static getPatient(currentUserUid) {
        return new Promise((resolve, reject) => {
            console.log('DB GET : CURRENT UID', currentUserUid);
            patientRef.doc(currentUserUid).get().then((doc => {
                if (doc.exists) {
                    console.log('DB GET : DOC DATA !', doc.data());
                    resolve(doc.data());
                }
                else {
                    reject(doc.data());
                }
            })).catch((error) => {
                console.log('DB GET : ERROR DOC !', error);
                reject(error);
            });
            // .then((success)=>{
            // 	console.log(success);
            // }).catch((error)=>{
            // 	reject()
            // })
        });
    }
    static fetchPatients(patientUids) {
        return new Promise((resolve, reject) => {
            docRef.get().then(snapshot => {
                console.log('DB FETCH : SNAPSHOT !', snapshot);
                let arr1 = [];
                let patArray = [];
                patArray = patientUids.split(',');
                snapshot.docChanges.forEach((doc) => {
                    console.log('DB FETCH : [doc id] !', doc.doc.id);
                    console.log('DB FETCH : [pat arr] !', patArray);
                    patArray.forEach((param) => {
                        console.log('DB FETCH : PARAM !', param);
                        if (doc.doc.id == param) {
                            arr1.push(doc.doc.data());
                        }
                    });
                });
                console.info('DB FETCH :RESOLVE :: ', arr1);
                resolve(arr1);
            }).catch(error => {
                reject(error);
            });
        });
    }
    static editListener(editData) {
        console.log('qwert', editData);
        return new Promise((resolve, reject) => {
            admin.firestore()
                .collection("patients")
                .doc(editData.userId)
                .update(editData)
                .then(res => {
                resolve(res);
            })
                .catch(e => {
                reject(e);
            });
            // if (editData.hasOwnProperty('patientName')) {
            // 	console.log('ccc');
            // 	console.log('hasOwnProp', editData.hasOwnProperty('patientName'));
            // 	docRef.doc(editData.userId).update({ patientName: editData.patientName }).then(success => {	
            // 		resolve(success)
            // 	}).catch(error => {
            // 		reject(error)
            // 	});
            // }
            // else {
            // 	console.log('hasOwnProp', editData);
            // 	docRef.doc(editData.userId).update({ patientAge: editData.patientAge }).then(success => {
            // 		resolve(success)
            // 	}).catch(error => {
            // 		reject(error)
            // 	})
            // }
            // else if (editData.hasOwnProperty('patientAddress')) {
            // 	docRef.doc(editData.userId).update({ patientName: editData.patientAddress }).then(success => {
            // 		resolve(success)
            // 	}).catch(error => {
            // 		reject(error)
            // 	})
            // }
            // else {
            // 	docRef.doc(editData.userId).update({ patientName: editData.gender }).then(success => {
            // 		resolve(success)
            // 	}).catch(error => {
            // 		reject(error)
            // 	})
            // }
        });
        // .catch((error)=>{
        // 	reject('error edit db')
        // })
    }
    static deletePatient(deleteData) {
        return new Promise((resolve, reject) => {
            patientRef.doc(deleteData.currentUserId).get().then(doc => {
                // ******************************			
                for (let abc in doc.data()) {
                    console.log('abcc', abc);
                    if (abc == deleteData.userId) {
                        patientRef2.doc(deleteData.currentUserId).update(abc, false);
                    }
                }
                // ******************************
                //////////////////////////////// 
                // Object.keys(doc.data()).forEach((key,index)=>{
                // 		console.log('KEYY',key.valueOf());
                // 		console.log('INDEX',index);
                // 		if(key == deleteData.userId){
                // 			let ref = 'doctorPatientsUids/'+deleteData.userId;
                // 			const patientRef2 = admin.firestore().doc(ref);
                // 			patientRef2.update(true);
                // 			console.log('current uid',deleteData.currentUserId);
                // 			//patientRef2.
                // 			// delete key
                // 			// delete deleteData.userId;
                // 			// deleteData.remove();
                // 			// patientRef2.doc.
                // 		}
                // 	})
                //////////////////////////////// 
                // for(let abc in doc.data()){
                // console.log('abcc',doc.data()[abc]);
                // if(doc.data()[abc].hasOwnProperty(abc)){
                // 	console.log('abcc',abc);
                // }
                // console.log(abc[doc.data()]);
                // }
            });
            // docRef.doc(deleteData.userId).get().then(success=>{
            // 	console.log('delete succ!!',success);
            // 	resolve(success);
            // }).catch(error=>{
            // 	 console.log('del err!',error);
            // 	 reject(error)
            // })
            docRef.doc(deleteData.userId).delete()
                .then(success => {
                patientRef.doc(deleteData.currentUserId);
                console.log('delete success', success);
                resolve(success);
            }).catch(error => {
                console.log('delete error', error);
                reject(error);
            });
        });
    }
    static realTimePatient() {
        return new Promise((resolve, reject) => {
            docRef.doc()
                .onSnapshot((doc) => {
                console.log("Current data: ", doc && doc.data());
            });
        }).then(success => {
            console.log('success realtime', success);
        }).catch(error => {
            console.log('error on realtime');
        });
        //  .catch(error =>{
        // 	 return reject()
        //  })
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
        auth_1.AuthClass.Login(req.body).then((success) => {
            console.log('login success', success);
            res.send(success);
        }).catch((error) => {
            console.log(error);
            res.send(error);
        });
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
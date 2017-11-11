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
            userRef.doc(currentUserUid.uid).get().then((doc) => {
                if (doc.exists) {
                    resolve(doc.data());
                }
                else {
                    console.log('no document exists');
                }
            }).catch((error) => {
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
                resolve(success);
            })
                .catch(a => {
                patientRef.doc(usersUids.user_id).set({ [usersUids.push_id]: true });
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
admin.initializeApp(functions.config().firebase);
const addPatient_1 = __webpack_require__(5);
const auth_1 = __webpack_require__(7);
// export { signupListener,loginListener,checkUserListener }
exports.addPatient = addPatient_1.listener;
exports.getPatients = addPatient_1.getPatientListener;
exports.fetchPatients = addPatient_1.fetchPatientsListener;
exports.editPatient = addPatient_1.editListener;
exports.deletePatient = addPatient_1.deleteListener;
exports.signup = auth_1.signupListener;
exports.login = auth_1.loginListener;
exports.firestore = functions.firestore;


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
        patient_1.PatientClass.addPatient(req.body).then((success) => {
            auth_1.AuthClass.OnPatientSuccess(success).then((succ) => {
                res.send(succ);
            }).catch(a => {
                res.send(a);
            });
        }).catch((err) => {
            res.send(err);
        });
    });
}));
exports.getPatientListener = functions.https.onRequest((req, res) => __awaiter(this, void 0, void 0, function* () {
    cors(req, res, () => {
        patient_1.PatientClass.getPatient(req.query.uid).then((success) => {
            res.send(success);
        }).catch((error) => {
            res.send(error);
        });
    });
}));
exports.fetchPatientsListener = functions.https.onRequest((req, res) => __awaiter(this, void 0, void 0, function* () {
    cors(req, res, () => {
        patient_1.PatientClass.fetchPatients(req.query.patientUids).then((success) => {
            res.send(success);
        }).catch((error) => {
            res.send(error);
        });
    });
}));
exports.editListener = functions.https.onRequest((req, res) => __awaiter(this, void 0, void 0, function* () {
    cors(req, res, () => {
        patient_1.PatientClass.editListener(req.body).then((success) => {
            res.send(success);
        }).catch((error) => {
            res.send(error);
        });
    });
}));
exports.deleteListener = functions.https.onRequest((req, res) => __awaiter(this, void 0, void 0, function* () {
    cors(req, res, () => {
        patient_1.PatientClass.deletePatient(req.body).then(success => {
            res.send(success);
        }).catch(error => {
            res.send(error);
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
            docRef.add({
                patientName: getData.patientName,
                patientAge: getData.patientAge,
                patientAddress: getData.patientAddress,
                gender: getData.gender,
            }).then((success) => {
                resolve({ 'push_id': success.id, 'user_id': getData.userId });
            }).catch((error) => {
                reject('failed');
            });
        });
    }
    static getPatient(currentUserUid) {
        return new Promise((resolve, reject) => {
            patientRef.doc(currentUserUid).get().then((doc => {
                if (doc.exists) {
                    resolve(doc.data());
                }
                else {
                    reject(doc.data());
                }
            })).catch((error) => {
                reject(error);
            });
        });
    }
    static fetchPatients(patientUids) {
        return new Promise((resolve, reject) => {
            docRef.get().then(snapshot => {
                let arr1 = [];
                let patArray = [];
                patArray = patientUids.split(',');
                snapshot.docChanges.forEach((doc) => {
                    patArray.forEach((param) => {
                        if (doc.doc.id == param) {
                            arr1.push(doc.doc.data());
                        }
                    });
                });
                resolve(arr1);
            }).catch(error => {
                reject(error);
            });
        });
    }
    static editListener(editData) {
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
        });
    }
    static deletePatient(deleteData) {
        return new Promise((resolve, reject) => {
            patientRef.doc(deleteData.currentUserId).get().then(doc => {
                for (let abc in doc.data()) {
                    if (abc == deleteData.userId) {
                        patientRef2.doc(deleteData.currentUserId).update(abc, false);
                    }
                }
            });
            docRef.doc(deleteData.userId).delete()
                .then(success => {
                patientRef.doc(deleteData.currentUserId);
                resolve(success);
            }).catch(error => {
                reject(error);
            });
        });
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
        res.send('signup seccuess');
        auth_1.AuthClass.Signup(req.body)
            .then((success) => {
        })
            .catch((error => {
        }));
    });
}));
exports.loginListener = functions.https.onRequest((req, res) => __awaiter(this, void 0, void 0, function* () {
    cors(req, res, () => {
        auth_1.AuthClass.Login(req.body).then((success) => {
            res.send(success);
        }).catch((error) => {
            res.send(error);
        });
    });
}));


/***/ })
/******/ ])));
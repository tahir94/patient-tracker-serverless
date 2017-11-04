import { tassign } from 'tassign';
import { GET_PATIENT_SUCCESS, DELETE, ADD_PATIENT, ADD_PATIENT_SUCCESS, LOCAL_DATA_SUCCESS, DELETE_SUCCESS,DOC_PATIENT_UIDS_SUCCESS } from '../actions/patient';


export interface PatientState {
	patientData: any;
	patientUids : any;
}

export const PATIENT_INITIAL_STATE = {
	patientData: [],
	patientUids : []

}

export const PatientReducer = (state: PatientState = PATIENT_INITIAL_STATE, action) => {

	switch (action.type) {
		case ADD_PATIENT_SUCCESS:
		console.log('reducer log ! ',action.payload);
		
		case DOC_PATIENT_UIDS_SUCCESS:
		return tassign({patientUids : action.payload})

		case GET_PATIENT_SUCCESS:
			return tassign({ patientData: action.payload })

		case DELETE_SUCCESS:
			// state.patientData.forEach((ele, i) => {
			// 	if (ele._id.toLowerCase() === action.payload.id.toLowerCase()) {
			// 		let demo = state.patientData.splice(i, 1);
			// 		return tassign({ patientData: demo })
			// 	}
			// })
		default:
			return state;

	}

}
import { tassign } from 'tassign';
import { GET_PATIENT_SUCCESS, GET_PATIENT, DELETE, ADD_PATIENT, ADD_PATIENT_SUCCESS, DELETE_SUCCESS, DOC_PATIENT_UIDS_SUCCESS } from '../actions/patient';


export interface PatientState {
	patientData: any;
	patientUids: any;
	patientForm: Array<any>;
	isLoading: boolean;
	isPatientList: boolean;
}

export const PATIENT_INITIAL_STATE = {
	patientData: [],
	patientUids: [],
	patientForm: null,
	isLoading: true,
	isPatientList: false
}

export const PatientReducer = (state: PatientState = PATIENT_INITIAL_STATE, action) => {

	switch (action.type) {
		case ADD_PATIENT_SUCCESS:
			return tassign({ patientForm: action.payload, sPatientList: true })

		case DOC_PATIENT_UIDS_SUCCESS:
			return tassign({ patientUids: action.payload })

		case ADD_PATIENT:
			return tassign({ isPatientList: false })

		case GET_PATIENT:
			return tassign({ isLoading: true, isPatientList: false })

		case GET_PATIENT_SUCCESS:
			return tassign({ patientData: action.payload, isLoading: false, isPatientList: true })

		case DELETE_SUCCESS:
			state.patientData.forEach((param, i) => {
				if (param.userId.toLowerCase() === action.payload.toLowerCase()) {
					let newPatientData = state.patientData.splice(i, 1)
				}
			})

		default:
			return state;

	}

}
import { tassign } from 'tassign';
import { SIGNUP_SUCCESS,SIGNUP_FAILED } from "../actions/auth";


export interface AuthState {
userData : Object;
errorMessage : string;
}

export const AUTH_INITIAL_STATE = {
userData : null,
errorMessage : null

}

export const AuthReducer = (state: AuthState = AUTH_INITIAL_STATE, action) => {

	switch (action.type) {
		
		case SIGNUP_SUCCESS:
		console.log(action.payload);
		
		return tassign({userData : action.payload});

		case SIGNUP_FAILED:
		console.log(action.payload);
		
		return tassign({errorMessagess : action.payload})
	
		default:
			return state;

	}

}
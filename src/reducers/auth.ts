import { tassign } from 'tassign';
import { LOGIN,SIGNUP_SUCCESS,SIGNUP_FAILED,LOGOUT_SUCCESS,LOGIN_SUCCESS,LOGIN_FAILED,GET_DATA_LOCALLY,LOCAL_DATA_SUCCESS } from "../actions/auth";


export interface AuthState {
userData : Object;
errorMessage : string;
isLoggedIn : Boolean;
}

export const AUTH_INITIAL_STATE = {
userData : null,
errorMessage : null,
isLoggedIn : false

}

export const AuthReducer = (state: AuthState = AUTH_INITIAL_STATE, action) => {
	
	switch (action.type) {

		case GET_DATA_LOCALLY:
		return tassign({isLoggedIn : false,isLoading : true})

		case LOCAL_DATA_SUCCESS:
		console.log('local success',action.payload)
		return tassign({isLoggedIn : false,isLoading : false});


		case SIGNUP_SUCCESS:
		console.log('signup reducer',action.payload);
		
		return tassign({userData : action.payload});
		
		case SIGNUP_FAILED:
		console.log(action.payload);
		
		return tassign({errorMessagess : action.payload});
		
		case LOGIN:
		return tassign({isLoggedIn : true,isLoading : true})

		case LOGIN_SUCCESS:
		
		
		console.log('login reducer',action.payload);
		return tassign({userData : action.payload,isLoggedIn : true,isLoading : false})
		case LOGIN_FAILED:
		console.log(action.payload);

		case LOGOUT_SUCCESS:
		return tassign({isLoggedIn : true})

		default:
		return state;
		
	}
	
}
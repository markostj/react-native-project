import { UserActionTypes } from './userTypes';
import { UserActions } from './userActions';

export interface UserState extends firebase.UserInfo {
    refereeCenter: string;
    authenticated: boolean;
    error: string;
    passwordIsReset: boolean;
}

const INITIAL_STATE: UserState = {
    displayName: '',
    email: '',
    phoneNumber: '',
    photoURL: '',
    providerId: '',
    uid: '',
    refereeCenter: '',
    authenticated: false,
    error: '',
    passwordIsReset: false
};

// Using helper in models
export default (state = INITIAL_STATE, action: UserActions): UserState => {
    switch (action.type) {
        case UserActionTypes.SetUserInfo:
            return {
                ...state,
                [action.payload.name]: action.payload.value
            };
        case UserActionTypes.AuthUser:
            return {
                ...state,
                authenticated: action.payload.auth
            };
        case UserActionTypes.Error:
            return {
                ...state,
                error: action.payload.error
            };
        case UserActionTypes.PasswordIsReset:
            return {
                ...state,
                passwordIsReset: action.payload.isReset
            };
        default:
            return state || INITIAL_STATE;
    }
};

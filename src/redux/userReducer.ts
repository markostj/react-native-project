import { UserActionTypes } from './userTypes';
export interface UserState extends firebase.UserInfo {
    refereeCenter: string;
    authenticated: boolean;
    error: '';
    resetPassword: boolean;
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
    resetPassword: false
};

/**
 * How to put here for example [value] : action.payload.[value]
 */
export default (state = INITIAL_STATE, action: any): UserState => {
    switch (action.type) {
        case UserActionTypes.GetUserInfo:
            return {
                ...state,
                email: 'bla'
            };
        case UserActionTypes.AuthUser:
            return {
                ...state,
                authenticated: true
            };
        case UserActionTypes.Error:
            return {
                ...state,
                error: action.payload
            };
        case UserActionTypes.PasswordReset:
            return {
                ...state,
                resetPassword: true
            };
        default:
            return state || INITIAL_STATE;
    }
};

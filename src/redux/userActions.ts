import { UserActionTypes } from './userTypes';

/**
 * Every set put in one action
 */
export const GetUserActions = {
    getUserInfo: (name: string, value: string) => ({
        type: UserActionTypes.GetUserInfo,
        payload: value
    }),
    authUser: () => ({
        type: UserActionTypes.AuthUser
    }),
    error: (error: string) => ({
        type: UserActionTypes.Error,
        payload: error
    }),
    resetPassword: () => ({
        type: UserActionTypes.PasswordReset
    })
};

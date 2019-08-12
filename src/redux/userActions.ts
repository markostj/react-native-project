import { UserActionTypes } from './userTypes';

/**
 * Every set put in one action
 */
export const GetUserActions = {
    getUserInfo: (value: string) => ({
        type: UserActionTypes.GetUserInfo,
        payload: value
    }),
    authUser: (auth: boolean) => ({
        type: UserActionTypes.AuthUser,
        payload: auth
    }),
    error: (error: string) => ({
        type: UserActionTypes.Error,
        payload: error
    }),
    resetPassword: () => ({
        type: UserActionTypes.PasswordReset
    })
};

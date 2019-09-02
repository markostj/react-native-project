import { UserActionTypes } from './userTypes';
// import { ActionUnion } from '../models/ActionUnion';
import { createAction } from '../helpers/createAction';

export const UserActions = {
    userInfo: (propName: string, value: string) =>
        createAction(UserActionTypes.SetUserInfo, { propName, value }),
    authUser: (auth: boolean) =>
        createAction(UserActionTypes.AuthUser, { auth }),
    error: (error: string) => createAction(UserActionTypes.Error, { error }),
    passwordIsReset: (isReset: boolean) =>
        createAction(UserActionTypes.PasswordIsReset, { isReset }),
    setInitialState: () => createAction(UserActionTypes.SetInitialState)
};

export type UserActions = ReturnType<
    typeof UserActions[keyof typeof UserActions]
>;

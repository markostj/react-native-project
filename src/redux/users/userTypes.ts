enum UserActions { // enum is for defining constant so we can easier use it
    SetUserInfo = 'user/SetUserInfo',
    AuthUser = 'user/AuthUser',
    Error = 'user/Error',
    PasswordIsReset = 'user/PasswordIsReset',
    SetInitialState = 'user/SetInitialState'
}

export const UserActionTypes = {
    ...UserActions
};

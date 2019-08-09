enum UserActions { // enum is for defining constant so we can easier use it
    GetUserInfo = 'user/GetUserInfo',
    AuthUser = 'user/AuthUser',
    Error = 'user/Error',
    PasswordReset = 'user/PasswordReset'
}

export const UserActionTypes = {
    ...UserActions
};

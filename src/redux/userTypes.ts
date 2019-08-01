enum UserActions { // enum is for defining constant so we can easier use it
    SetName = 'user/SetName',
    SetCenter = 'user/SetCenter',
    UserError = 'user/UserError',
    UserLoading = 'user/UserLoading',
    FetchSuccess = 'user/FetchSuccess',
    SetUID = 'user/SetUID',
    SetUrlPics = 'user/SetUrlPics'
}

export const UserActionTypes = {
    ...UserActions
};

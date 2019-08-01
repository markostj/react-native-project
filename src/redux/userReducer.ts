import { UserActionTypes } from './userTypes';
export interface UserState {
    name: string;
    center: string;
    error: boolean;
    loading: boolean;
    uid: string;
    urlPic: string;
}

const INITIAL_STATE: UserState = {
    name: '',
    center: '',
    error: false,
    loading: false,
    uid: '',
    urlPic: ''
};

export default (state = INITIAL_STATE, action: any): UserState => {
    switch (action.type) {
        case UserActionTypes.SetName:
            return {
                ...state,
                name: action.payload
            };
        case UserActionTypes.SetCenter:
            return {
                ...state,
                center: action.payload
            };
        case UserActionTypes.UserError:
            return {
                ...state,
                error: action.payload
            };
        case UserActionTypes.UserLoading:
            return {
                ...state,
                loading: action.payload
            };
        case UserActionTypes.FetchSuccess:
            return {
                ...state,
                name: action.name,
                center: action.center
            };
        case UserActionTypes.SetUID:
            return {
                ...state,
                uid: action.payload
            };
        case UserActionTypes.SetUrlPics:
            return {
                ...state,
                urlPic: action.payload
            };
        default:
            return state || INITIAL_STATE;
    }
};

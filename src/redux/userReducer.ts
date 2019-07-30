import { UserActionTypes } from './userTypes';
export interface UserState {
    name: string;
    center: string;
    error: boolean;
    loading: boolean;
}

const INITIAL_STATE: UserState = {
    name: '',
    center: '',
    error: false,
    loading: false
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
        default:
            return state || INITIAL_STATE;
    }
};

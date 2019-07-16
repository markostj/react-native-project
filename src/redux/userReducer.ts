import { UserActionTypes } from './userTypes';

export interface UserState {
    name: string;
    center: string;
}

const INITIAL_STATE: UserState = {
    name: '',
    center: ''
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
        default:
            return state || INITIAL_STATE;
    }
};

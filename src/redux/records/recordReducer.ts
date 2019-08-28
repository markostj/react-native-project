import { RecordActionTypes } from './recordTypes';
import { RecordActions } from './recordActions';
import { Record } from 'models';

export interface RecordState {
    records?: Record[];
    error: string;
}

const INITIAL_STATE: RecordState = {
    records: undefined,
    error: ''
};

// Using helper in models
export default (state = INITIAL_STATE, action: RecordActions): RecordState => {
    switch (action.type) {
        case RecordActionTypes.RecordSuccess:
            return {
                ...state,
                records: action.payload.records
            };
        case RecordActionTypes.RecordError:
            return {
                ...state,
                error: action.payload.error
            };
        default:
            return state || INITIAL_STATE;
    }
};

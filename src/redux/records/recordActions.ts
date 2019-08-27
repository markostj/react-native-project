import { RecordActionTypes } from './recordTypes';
import { createAction } from '../helpers/createAction';

export const RecordActions = {
    recordSuccess: (records: any) =>
        createAction(RecordActionTypes.RecordSuccess, { records }),
    recordError: (error: string) =>
        createAction(RecordActionTypes.RecordError, { error })
};

export type RecordActions = ReturnType<
    typeof RecordActions[keyof typeof RecordActions]
>;

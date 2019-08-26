import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import userReducer, { UserState } from './userReducer';
import recordReducer, { RecordState } from './records/recordReducer';
import thunk from 'redux-thunk';

export interface ApplicationState {
    user: UserState;
    record: RecordState;
}

export const configureStore = () => {
    const composeEnchancers = composeWithDevTools({});

    const rootReducer = {
        user: userReducer,
        record: recordReducer
    };

    return createStore(
        combineReducers(rootReducer),
        composeEnchancers(applyMiddleware(thunk))
    );
};

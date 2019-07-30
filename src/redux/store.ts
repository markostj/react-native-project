import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import userReducer, { UserState } from './userReducer';
import thunk from 'redux-thunk';

export interface ApplicationState {
    user: UserState;
}

export const configureStore = () => {
    const composeEnchancers = composeWithDevTools({});

    const rootReducer = {
        user: userReducer
    };

    return createStore(
        combineReducers(rootReducer),
        composeEnchancers(applyMiddleware(thunk))
    );
};

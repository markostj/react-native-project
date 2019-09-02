import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import userReducer, { UserState } from './users/userReducer';
import recordReducer, { RecordState } from './records/recordReducer';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import { AsyncStorage } from 'react-native';

const setPersistorConfig = (
    key: string,
    whitelist?: string[],
    blacklist?: string[]
) => ({
    key,
    storage: AsyncStorage,
    whitelist,
    blacklist
});

/**
 * Method called on app initialisation for:
 * - creating a new store
 * - converting all reducers to a single store object.
 * - applying custom store middleware such as redux-thunk
 */

export interface ApplicationState {
    user: UserState;
    record: RecordState;
}

export const configureStore = () => {
    // Combine all reducers
    const rootReducer = combineReducers({
        user: persistReducer(
            setPersistorConfig('user', [
                'authenticated',
                'displayName',
                'email',
                'photoURL',
                'uid',
                'refereeCenter',
                'error',
                'passwordIsReset'
            ]),
            userReducer
        ),
        record: persistReducer(
            setPersistorConfig('records', ['records', 'error']),
            recordReducer
        )
    });

    // Persist the root reducer
    const persistedReducer = rootReducer;

    /**
     * Create the composing function for our middlewares
     * Include dev tools support
     */
    const enhancers = composeWithDevTools(applyMiddleware(thunk));

    // Create store and its persistor
    const store = createStore(persistedReducer, enhancers);
    const persistor = persistStore(store);

    return { store, persistor };

    /*  const composeEnchancers = composeWithDevTools({}); */

    /*    const rootReducer = {
        user: userReducer,
        record: recordReducer
    }; */
    /* 
    return createStore(
        combineReducers(rootReducer),
        composeEnchancers(applyMiddleware(thunk))
    ); */
};

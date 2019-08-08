import { UserActionTypes } from './userTypes';
import { FirebaseAuth, FirebaseDatabase } from '../firebase/FirebaseService';
import { Alert } from 'react-native';
import { NavigationActions } from 'react-navigation';

import * as firebase from 'firebase';
import { Dispatch } from 'redux';

/**
 * Every set put in one action
 */
export const GetUserActions = {
    setName: (name: string) => ({
        type: UserActionTypes.SetName,
        payload: name
    }),
    setCenter: (center: string) => ({
        type: UserActionTypes.SetCenter,
        payload: center
    }),
    userError: (error: boolean) => ({
        type: UserActionTypes.UserError,
        payload: error
    }),
    userLoading: (loading: boolean) => ({
        type: UserActionTypes.UserLoading,
        payload: loading
    }),
    setUID: (uid: string) => ({
        type: UserActionTypes.SetUID,
        payload: uid
    }),
    setUrlPics: (url: string) => ({
        type: UserActionTypes.SetUrlPics,
        payload: url
    }),
    authUser: () => ({
        type: UserActionTypes.AuthUser
    })
};

export const signIn = (email: string, password: string) => async (
    dispatch: Dispatch
) => {
    try {
        const user = await FirebaseAuth.signInWithEmailAndPassword(
            email,
            password
        );
        /**
         * have to put navigation
         */
        dispatch(GetUserActions.setUID(user.user.uid));
        dispatch(GetUserActions.authUser());
    } catch (error) {
        Alert.alert(error.message);
    }
};
/**
 * What is correct form for up or down async ?
 *
 */

export function getCenter(uid: string) {
    return async dispatch => {
        try {
            const snapshot = await FirebaseDatabase.collection(`users`)
                .doc(uid)
                .get();
            dispatch(GetUserActions.setCenter(snapshot.data().center));
            dispatch(GetUserActions.userLoading(false));
        } catch (error) {
            Alert.alert(error.message);
        }
    };
}

export function getProfilePic(uid: string) {
    return async dispatch => {
        try {
            const data = await firebase
                .storage()
                .ref(`${uid}.jpg`)
                .getDownloadURL();
            dispatch(GetUserActions.setUrlPics(data));
        } catch (error) {
            Alert.alert(error.message);
        }
    };
}

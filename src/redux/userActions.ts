import { UserActionTypes } from './userTypes';
import { FirebaseAuth, FirebaseDatabase } from '../firebase/FirebaseService';
import { Alert } from 'react-native';
import { NavigationActions } from 'react-navigation';

import * as firebase from 'firebase';

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
    fetchSuccess: (name: string, center: string) => ({
        type: UserActionTypes.FetchSuccess,
        name,
        center
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

export function itemsFetchData(url: string) {
    return dispatch => {
        dispatch(GetUserActions.userLoading(true));

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                dispatch(GetUserActions.userLoading(false));

                return response;
            })
            .then(response => response.json())
            .then(items =>
                dispatch(
                    GetUserActions.fetchSuccess(items.name, items.address.city)
                )
            )
            .catch(() => dispatch(GetUserActions.userError(true)));
    };
}

export function signIn(email: string, password: string) {
    return dispatch => {
        FirebaseAuth.signInWithEmailAndPassword(email, password)
            .then(user => {
                dispatch(GetUserActions.setUID(user.user.uid));
            })
            .then(() => {
                dispatch(GetUserActions.authUser());
            })
            /**
             * Have to put navigation
             * Do it like dispatch?
             */
            .catch(error => {
                Alert.alert(error.message);
            });
    };
}

export function getCenter(uid: string) {
    return dispatch => {
        FirebaseDatabase.collection(`users`)
            .doc(uid)
            .get()
            .then(snapshot => {
                dispatch(GetUserActions.setCenter(snapshot.data().center));
            })
            .then(() => {
                dispatch(GetUserActions.userLoading(false));
            })
            .catch(error => {
                Alert.alert(error.message);
            });
    };
}

export function getProfilePic(uid: string) {
    return dispatch => {
        firebase
            .storage()
            .ref(`${uid}.jpg`)
            .getDownloadURL()
            .then(data => {
                dispatch(GetUserActions.setUrlPics(data));
            });
    };
}

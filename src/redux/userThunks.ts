import { Dispatch } from 'redux';
import { FirebaseAuth } from '../firebase/FirebaseService';
import { GetUserActions } from './userActions';
import * as firebase from 'firebase';

export const signIn = (email: string, password: string) => async (
    dispatch: Dispatch
) => {
    try {
        const credential = await FirebaseAuth.signInWithEmailAndPassword(
            email,
            password
        );

        if (credential.user) {
            dispatch(GetUserActions.authUser(true));
            const photo = credential.user.photoURL.toString();
            dispatch(GetUserActions.getUserInfo(photo));

            console.log(credential.user);
            /**
             * Nakon uspješnog dohvatiti sve kolekcije vezane za usera
             * Mergati podatke iz firebase autha i tih kolekcija u lokalni user objekt
             * dispatchirati usera sa svim podacima u reduxs
             */
        }
    } catch (error) {
        dispatch(GetUserActions.error(error.message));
    }
};

export const passwordReset = (email: string) => async (dispatch: Dispatch) => {
    try {
        const reset = await FirebaseAuth.sendPasswordResetEmail(email);
        dispatch(GetUserActions.error(''));
        dispatch(GetUserActions.resetPassword());
    } catch (error) {
        dispatch(GetUserActions.error(error.message));
    }
};

export const logOut = () => async (dispatch: Dispatch) => {
    const signout = await FirebaseAuth.signOut();
    dispatch(GetUserActions.authUser(false));
};

export const uploadAvatar = (photoUri: string) => async (
    dispatch: Dispatch
) => {
    const user = FirebaseAuth.currentUser;

    const uploadImage = async (uri: string) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        const ref = firebase
            .storage()
            .ref()
            .child('Avatars/' + user.uid);
        return ref.put(blob);
    };

    uploadImage(photoUri)
        .then(async () => {
            const data = await firebase
                .storage()
                .ref()
                .child('Avatars/' + user.uid)
                .getDownloadURL();
            console.log(data);
            return data;
        })
        .then(data => {
            user.updateProfile({
                photoURL: data
            });
            dispatch(GetUserActions.getUserInfo(data));
        });
};


// obrisati svo nepotrebno ispod !
/* export function getCenter(uid: string) {
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

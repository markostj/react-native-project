import { Dispatch } from 'redux';
import { FirebaseAuth } from '../firebase/FirebaseService';
import { UserActions } from './userActions';
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
            console.log(credential.user);
            dispatch(UserActions.authUser(true));
            /**
             * Provjerit jel mi ovaj dispatch slike treba uopce, trebalo bi radit bez toga
             */
            if (credential.user.photoURL) {
                dispatch(
                    UserActions.userInfo('photoURL', credential.user.photoURL)
                );
            }
            if (credential.user.email) {
                dispatch(
                    UserActions.userInfo('displayName', credential.user.email)
                );
            }

            /**
             * Nakon uspješnog dohvatiti sve kolekcije vezane za usera
             * Mergati podatke iz firebase autha i tih kolekcija u lokalni user objekt
             * dispatchirati usera sa svim podacima u reduxs
             */
        }
    } catch (error) {
        dispatch(UserActions.error(error.message));
    }
};

export const passwordReset = (email: string) => async (dispatch: Dispatch) => {
    try {
        await FirebaseAuth.sendPasswordResetEmail(email);
        dispatch(UserActions.passwordIsReset(true));
    } catch (error) {
        dispatch(UserActions.error(error.message));
    }
};

export const logOut = () => (dispatch: Dispatch) => {
    FirebaseAuth.signOut();
    dispatch(UserActions.authUser(false));
};

export const uploadAvatar = (photoUri: string) => (dispatch: Dispatch) => {
    const user = FirebaseAuth.currentUser;
    if (user) {
        uploadImage(photoUri, 'Avatars', user.uid)
            .then(() => {
                const data = firebase
                    .storage()
                    .ref()
                    .child(`Avatars/${user.uid}`)
                    .getDownloadURL();
                return data;
            })
            .then(data => {
                user.updateProfile({
                    photoURL: data
                });
                dispatch(UserActions.userInfo('photoURL', data));
            });
    }
};

export const uploadRecord = (photoUri: string) => (dispatch: Dispatch) => {
    const uuidv4 = require('uuid/v4');
    uploadImage(photoUri, 'Records', uuidv4());
};

// Vidjet za imena kolekcija i to kako je Vlaja rekao
const uploadImage = async (
    uri: string,
    collectionName: string,
    picName: string
) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const ref = firebase
        .storage()
        .ref()
        .child(`${collectionName}/` + picName);
    return ref.put(blob);
};

export const changeEmail = (email: string) => async (dispatch: Dispatch) => {
    if (FirebaseAuth.currentUser) {
        try {
            await FirebaseAuth.currentUser.updateEmail(email);
            dispatch(UserActions.authUser(false));
        } catch (error) {
            /* const user = await FirebaseAuth.currentUser
            .updateEmail(email)
            .then(() => {
                dispatch(GetUserActions.error(''));
                dispatch(GetUserActions.authUser(false));
            }); */
            dispatch(UserActions.error(error.message));
        }
    }
};

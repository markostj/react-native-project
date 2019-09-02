import { Dispatch } from 'redux';
import { FirebaseAuth, FirebaseDatabase } from '../../firebase/FirebaseService';
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

            const uid = credential.user.uid;
            FirebaseDatabase.collection('users')
                .doc(uid)
                .get()
                .then(doc => {
                    if (doc.exists) {
                        const data = doc.data();

                        if (data) {
                            if (credential.user) {
                                credential.user.updateProfile({
                                    displayName: data.name
                                });
                            }

                            dispatch(
                                UserActions.userInfo(
                                    'refereeCenter',
                                    data.refereeCenter
                                )
                            );
                            dispatch(UserActions.userInfo('uid', data.uid));
                            dispatch(
                                UserActions.userInfo('displayName', data.name)
                            );
                        }
                    }
                })
                .catch(error => {
                    console.log(error.message);
                });
            if (credential.user.photoURL) {
                dispatch(
                    UserActions.userInfo('photoURL', credential.user.photoURL)
                );
            }
            if (credential.user.email) {
                dispatch(UserActions.userInfo('email', credential.user.email));
            }
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
    dispatch(UserActions.setInitialState());
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

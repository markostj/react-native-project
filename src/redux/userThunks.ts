import { Dispatch } from 'redux';
import { FirebaseAuth } from '../firebase/FirebaseService';
import { GetUserActions } from './userActions';

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
            credential.user.updateProfile({
                displayName: credential.user.email,
                photoURL: [credential.user.uid] + '.jpg'
            });
            // vidjet kako se update-a user nekako ovako    ...credential.user.toJSON(),
            // update-a se to jednom i onda se sam dohvaca iz usera
            console.log(credential.user);
            /**
             * Nakon uspješnog dohvatiti sve kolekcije vezane za usera
             * Mergati podatke iz firebase autha i tih kolekcija u lokalni user objekt
             * dispatchirati usera sa svim podacima u reduxs
             */
            // Setati userStateIsChanging: true za loader prije svega, ne poslje
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

/**
 * What is correct form for async up or down?
 *
 */

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

Image url-ovi su trajni. Na uploadu avatara, saveati image url u user profile kolekciju

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

 */

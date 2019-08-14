import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyBtIZWqBD99S3U4m2f-lszkCGknhJC6awM',
    authDomain: 'ns-zapisnik.firebaseapp.com',
    databaseURL: 'https://ns-zapisnik.firebaseio.com',
    projectId: 'ns-zapisnik',
    storageBucket: 'gs://ns-zapisnik.appspot.com',
    messagingSenderId: '613091037969',
    appId: '1:613091037969:web:7b8bd337ae8d0236'
};

firebase.initializeApp(firebaseConfig);

const firebaseWithConfig = !firebase.apps.length
    ? firebase.initializeApp(firebaseConfig)
    : firebase.app();

export const FirebaseAuth = firebaseWithConfig.auth();
export const FirebaseDatabase = firebaseWithConfig.firestore();

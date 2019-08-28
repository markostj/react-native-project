import { Dispatch } from 'redux';
import { FirebaseDatabase } from '../../firebase/FirebaseService';
import { RecordActions } from './recordActions';

export const getAllGames = () => (dispatch: Dispatch) => {
    FirebaseDatabase.collection('records')
        .orderBy('timestamp', 'desc')
        .get()
        .then(response => {
            const allRecords = response.docs.map(doc => {
                if (doc.exists) {
                    return {
                        id: doc.id,
                        ...doc.data()
                    };
                }
            });

            dispatch(RecordActions.recordSuccess(allRecords));
        })
        .catch(error => {
            dispatch(RecordActions.recordError(error.message));
            console.log(error.message);
        });
};

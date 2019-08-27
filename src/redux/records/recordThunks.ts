import { Dispatch } from 'redux';
import { FirebaseDatabase } from '../../firebase/FirebaseService';
import { RecordActions } from './recordActions';

export const getGames = () => (dispatch: Dispatch) => {
    FirebaseDatabase.collection('records')
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

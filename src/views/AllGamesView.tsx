import React, { useEffect } from 'react';

import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
  Alert
} from 'react-native';

import { NavigationScreenProps } from 'react-navigation';
import { connect } from 'react-redux';

import { Navigation } from '../components/Navigation';
import { getGames } from '../redux/records/recordThunks';
import { ApplicationState } from '../redux/store';

import { FirebaseDatabase } from '../firebase/FirebaseService';

type Props = NavigationScreenProps & ReduxProps & DispatchProps;

interface ReduxProps {
  records: any;
  error: string;
}
interface DispatchProps {
  listGames: () => void;
}

// U Thunk ce to trebat i treba se napravit Flatlista
/* const getGames = async () => {
  const snapshot = await FirebaseDatabase.collection('records').get();
  snapshot.docs.map(doc => {
    if (doc.exists) {
      const data = doc.data();
      if (data) {
        console.log(`${data.homeTeam}-${data.awayTeam} (${data.result})`);
      }
    }
  });
}; */

// Firebase Firestore - OR query vidjet s vlatkom kako je najbolje jel to RxJS ili nesto drugo
// Ovo je za UserView gdje moce moci vidjet samo svoje utakmice .where('referee', '==', displayName-iz reduxa), .where('firstReferee', '==', displayName)
// .where('secondReferee', '==', displayName)
/* const getGames = () => {
  FirebaseDatabase.collection('records')
    .where('referee', '==', 'das')
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, ' => ', doc.data());
      });
    })
    .catch(error => {
      Alert.alert(error.message);
    });
};
 */

// Order by date and maybe write date also
const AllGamesView: React.FC<Props> = ({
  navigation,
  listGames,
  records,
  error
}) => {
  useEffect(() => {
    listGames();
  }, []);

  if (records !== undefined) {
    console.log(records);

    return (
      <SafeAreaView style={styles.container}>
        <View>
          {records.map(item => (
            <Text style={styles.text} key={item.id}>
              {item.homeTeam} - {item.awayTeam} ({item.result})
            </Text>
          ))}
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Loading...</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 20
  }
});

export default connect<ReduxProps, DispatchProps, null, ApplicationState>(
  state => ({
    records: state.record.records,
    error: state.record.error
  }),
  {
    listGames: getGames
  }
)(AllGamesView);

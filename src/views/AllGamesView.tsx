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
import { getAllGames } from '../redux/records/recordThunks';
import { ApplicationState } from '../redux/store';

import { FirebaseDatabase } from '../firebase/FirebaseService';

import { CirclesLoader, TextLoader } from 'react-native-indicator';

type Props = NavigationScreenProps & ReduxProps & DispatchProps;

interface ReduxProps {
  records: any;
  error: string;
}
interface DispatchProps {
  listGames: () => void;
}

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
          {records.map(
            (game: {
              id: string | number | undefined;
              date: React.ReactNode;
              homeTeam: React.ReactNode;
              awayTeam: React.ReactNode;
              result: React.ReactNode;
            }) => (
              <Text style={styles.text} key={game.id}>
                {game.date} {game.homeTeam} - {game.awayTeam} ({game.result})
              </Text>
            )
          )}
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <CirclesLoader size={100} />
      <TextLoader style={styles.loadingText} text="Loading" />
    </View>
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
    textAlign: 'center',
    fontSize: 18,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#808080',
    marginBottom: 5
  },
  loadingText: {
    fontSize: 20,
    textAlign: 'center'
  }
});

export default connect<ReduxProps, DispatchProps, null, ApplicationState>(
  state => ({
    records: state.record.records,
    error: state.record.error
  }),
  {
    listGames: getAllGames
  }
)(AllGamesView);

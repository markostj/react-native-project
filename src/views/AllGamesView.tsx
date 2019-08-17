import React from 'react';

import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
  Alert
} from 'react-native';

import { NavigationScreenProps } from 'react-navigation';

import { Navigation } from '../components/Navigation';
import { FirebaseDatabase } from '../firebase/FirebaseService';

type Props = NavigationScreenProps;

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
const getGames = () => {
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

const AllGamesView: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <TouchableHighlight onPress={getGames}>
          <Text>Get Games</Text>
        </TouchableHighlight>
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
  }
});

export default AllGamesView;

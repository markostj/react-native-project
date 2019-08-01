import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { connect } from 'react-redux';

import { ApplicationState } from '../redux/store';

import { Navigation } from '../components/Navigation';

import { itemsFetchData, GetUserActions } from '../redux/userActions';

import * as firebase from 'firebase';
import { FirebaseDatabase } from '../firebase/FirebaseService';

type Props = NavigationScreenProps & ReduxProps & DispatchProps;

interface ReduxProps {
  userName: string;
  userCenter: string;
  userUID: string;
  urlPic: string;
}

interface DispatchProps {
  fetchData: (url: string) => void;
  setCenter: (center: string) => void;
  setUrlPic: (url: string) => void;
}

const LocationView: React.FC<Props> = ({
  navigation,
  userName,
  userCenter,
  fetchData,
  userUID,
  setCenter,
  setUrlPic,
  urlPic
}) => {
  console.log(userName, userCenter);
  console.log(navigation.navigate);

  console.log(userUID);

  const [location, setLocation] = useState('Osijek');

  FirebaseDatabase.collection(`users`)
    .doc(userUID)
    .get()
    .then(snapshot => {
      setCenter(snapshot.data().center);
    })
    .catch(error => {
      console.log('Error getting data', error);
    });

  /**
   * location from geolocation
   */

  /* useEffect(() => {
    // Excercise probably make something with firebase and then fetch it
    fetchData('https://jsonplaceholder.typicode.com/users/2');
  }, []); 
    See if we need this?
  */
  const ref = firebase.storage().ref(`${userUID}.jpg`);
  ref.getDownloadURL().then(data => {
    setUrlPic(data);
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image // Put real picture from firebase storage
          style={styles.headerImg}
          source={{
            uri: urlPic
          }}
        />
        <Text style={styles.headerName}>{userName}</Text>
        <Text style={styles.headerCenter}> {userCenter}</Text>
        {/*         <Text style={styles.headerCenter}> {userCenter}</Text> */}
      </View>
      <Image // Put real location and save it to location
        style={styles.bodyImg}
        source={require('C:/Users/marko/OneDrive/Desktop/Projekt/src/img/location.png')}
      />
      <View>
        <Navigation
          value="Menu"
          colorBg="#f4511e"
          text="Odaberi vrstu zapisnika"
          size={25}
          {...navigation}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerImg: {
    width: 100,
    height: 100,
    borderRadius: 50
  },
  headerName: {
    marginTop: 10,
    fontSize: 20
  },
  headerCenter: {
    fontSize: 15,
    marginBottom: 10
  },
  bodyImg: {
    width: 350,
    height: 300,
    marginBottom: 20
  }
});

export default connect<ReduxProps, DispatchProps, null, ApplicationState>(
  state => ({
    userName: state.user.name,
    userCenter: state.user.center,
    userUID: state.user.uid,
    urlPic: state.user.urlPic
  }),
  {
    fetchData: itemsFetchData,
    setCenter: GetUserActions.setCenter,
    setUrlPic: GetUserActions.setUrlPics
  }
)(LocationView);

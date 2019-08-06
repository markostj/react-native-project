import React, { useEffect, useState } from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Alert
} from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { connect } from 'react-redux';

import { ApplicationState } from '../redux/store';

import { Navigation } from '../components/Navigation';

import { itemsFetchData, GetUserActions } from '../redux/userActions';

import * as firebase from 'firebase';
import { FirebaseDatabase } from '../firebase/FirebaseService';

import { CirclesLoader, TextLoader } from 'react-native-indicator';

import GetLocation from 'react-native-get-location';

import Geocoder from 'react-native-geocoding';

Geocoder.init('AIzaSyAOwmI18jGOgTZBJX11b9Bbq0Y7HZI0898');

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
  console.log(userUID);

  console.log(userName, userCenter);

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [loading, setLoading] = useState(true);
  const [mjesto, setMjesto] = useState('');
  const [ulica, setUlica] = useState('');

  FirebaseDatabase.collection(`users`)
    .doc(userUID)
    .get()
    .then(snapshot => {
      setCenter(snapshot.data().center);
    })
    .then(() => setLoading(false))
    .catch((error: string) => {
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

  /* GetLocation.getCurrentPosition({
    enableHighAccuracy: true,
    timeout: 15000
  })
    .then((location: { latitude: number; longitude: number }) => {
      console.log(location);
      const lat = location.latitude;
      const long = location.longitude;
      setLatitude(lat.toFixed(2));
      setLongitude(long.toFixed(2));
      console.log(latitude, longitude);
    })
    .then(() => {
      fetch(
        'https://maps.googleapis.com/maps/api/geocode/json?address=' +
          latitude +
          ',' +
          longitude +
          '&key=' +
          'AIzaSyAOwmI18jGOgTZBJX11b9Bbq0Y7HZI0898'
      )
        .then(response => response.json())
        .then(responseJson => {
          setUlica(responseJson.results[0].address_components[1].short_name);
          setMjesto(responseJson.results[0].address_components[2].long_name);
          console.log(`Ulica: ${ulica} Grad: ${mjesto}`);
        });
    })
    .catch((error: { code: string; message: string }) => {
      const { code, message } = error;
      console.warn(code, message);
    });

  if (loading || userName === '') {
    return (
      <View style={styles.container}>
        <CirclesLoader size={100} />
        <TextLoader text="Loading" />
      </View>
    );
  } */

  /**
   * Put map?
   */

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.headerImg}
          source={{
            uri: urlPic
          }}
        />
        <Text style={styles.headerName}>{userName}</Text>
        <Text style={styles.headerCenter}> {userCenter}</Text>
        <Text style={styles.headerName}>
          Trenutna adresa:{ulica}, {mjesto}
        </Text>
      </View>
      <View>
        <Navigation
          value="Games"
          colorBg="#bf3eff"
          text="Pokaži prijašnje utakmice"
          size={25}
          {...navigation}
        />
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

import React, { useEffect } from 'react';

import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableHighlight,
  Text
} from 'react-native';

import { NavigationScreenProps } from 'react-navigation';

import { Navigation } from '../components/Navigation';
import { connect } from 'react-redux';

import { ApplicationState } from '../redux/store';

import { logOut } from '../redux/users/userThunks';
import { CirclesLoader, TextLoader } from 'react-native-indicator';

type Props = NavigationScreenProps & ReduxProps & DispatchProps;

interface ReduxProps {
  authUser: boolean;
}

interface DispatchProps {
  logOut: () => void;
}

const AdminView: React.FC<Props> = ({ navigation, logOut, authUser }) => {
  useEffect(() => {
    if (!authUser) {
      navigation.navigate('Login');
    }
  });

  if (!authUser) {
    return (
      <View style={styles.container}>
        <CirclesLoader size={100} />
        <TextLoader text="Loading" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}> Admin </Text>
      <View>
        <Navigation
          value="AddUser"
          colorBg="#0000ff"
          text="Dodaj korisnika"
          size={14}
          {...navigation}
        />
        <Navigation
          value="ChangeEmail"
          colorBg="#0000ff"
          text="Promijeni Email"
          size={14}
          {...navigation}
        />
        <Navigation
          value="AllGames"
          colorBg="#0000ff"
          text="Izlistaj utakmice"
          size={14}
          {...navigation}
        />
      </View>
      <TouchableHighlight
        onPress={handleLogOut}
        style={styles.logOutBtn}
        underlayColor={'red'}
      >
        <Text style={styles.logOutText}> Odlogiraj se</Text>
      </TouchableHighlight>
    </SafeAreaView>
  );

  function handleLogOut() {
    logOut();
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  title: {
    fontSize: 40,
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'red',
    width: '100%'
  },
  logOutBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    borderWidth: 2,
    borderColor: 'black',
    marginTop: 30,
    marginBottom: 20,
    marginLeft: 10,
    padding: 10,
    borderRadius: 20,
    width: 150,
    height: 50
  },
  logOutText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 15
  }
});

export default connect<ReduxProps, DispatchProps, null, ApplicationState>(
  state => ({
    authUser: state.user.authenticated
  }),
  {
    logOut
  }
)(AdminView);

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
          colorBg="#ff9933"
          text="Dodaj korisnika"
          size={30}
          {...navigation}
        />
        <Navigation
          value="ChangeEmail"
          colorBg="#0080ff"
          text="Promijeni Email"
          size={30}
          {...navigation}
        />
        <Navigation
          value="AllGames"
          colorBg="#cccc00"
          text="Izlistaj utakmice"
          size={30}
          {...navigation}
        />
        <TouchableHighlight
          onPress={handleLogOut}
          style={styles.logOutBtn}
          underlayColor={'#8F8F8F'}
        >
          <Text style={styles.logOutText}> Odlogiraj se</Text>
        </TouchableHighlight>
      </View>
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
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  logOutBtn: {
    backgroundColor: 'red',
    borderWidth: 1,
    borderColor: 'black',
    marginTop: 30,
    marginBottom: 20,
    padding: 20
  },
  logOutText: {
    color: '#000',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 25
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

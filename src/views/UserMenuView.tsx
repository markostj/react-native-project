import React, { useState } from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native';
import { NavigationScreenProps, ScrollView } from 'react-navigation';
import { connect } from 'react-redux';

import { ApplicationState } from '../redux/store';

import { Navigation } from '../components/Navigation';

import { CirclesLoader, TextLoader } from 'react-native-indicator';

import { logOut } from '../redux/users/userThunks';

type Props = NavigationScreenProps & ReduxProps & DispatchProps;

interface ReduxProps {
  displayName: string;
  refereeCenter: string;
  email: string;
  photoURI: string;
}

interface DispatchProps {
  loginOut: () => void;
}

const UserMenuView: React.FC<Props> = ({
  navigation,
  displayName,
  refereeCenter,
  email,
  photoURI,
  loginOut
}) => {
  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerName}>{displayName}</Text>
          <TouchableOpacity onPress={navigateToChangeAvatarView}>
            <Image
              style={styles.headerImg}
              source={{
                uri: photoURI
              }}
            />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerName}>{email}</Text>
            <Text style={styles.headerCenter}> {refereeCenter}</Text>
          </View>
        </View>
        <View style={styles.buttons}>
          <Navigation
            value="Avatar"
            colorBg="#0000ff"
            text="Promijeni profilnu sliku"
            size={14}
            {...navigation}
          />
          <Navigation
            value="ChangeEmail"
            colorBg="#0000ff"
            text="Promijeni email"
            size={14}
            {...navigation}
          />
          <Navigation
            value="UserGames"
            colorBg="#0000ff"
            text="Prijašnje utakmice"
            size={14}
            {...navigation}
          />
        </View>
        <View>
          <TouchableHighlight
            onPress={handleLogOut}
            style={styles.logOutBtn}
            underlayColor={'red'}
          >
            <Text style={styles.logOutText}>Odjavi se</Text>
          </TouchableHighlight>
        </View>
      </SafeAreaView>
    </ScrollView>
  );

  function handleLogOut() {
    loginOut();
  }

  function navigateToChangeAvatarView() {
    navigation.navigate('Avatar');
  }
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
    width: 180,
    height: 180,
    borderRadius: 90
  },
  headerName: {
    fontSize: 22,
    marginBottom: 10
  },
  headerEmail: {
    marginTop: 20,
    fontSize: 22
  },
  headerCenter: {
    fontSize: 20,
    textAlign: 'center'
  },
  bodyImg: {
    width: 350,
    height: 300,
    marginBottom: 20
  },
  logOutBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    borderWidth: 2,
    borderColor: 'black',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
    width: 150,
    height: 50
  },
  logOutText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 15
  },
  buttons: {
    flexDirection: 'column',
    marginTop: 10,
    marginBottom: 20
  }
});

export default connect<ReduxProps, null, null, ApplicationState>(
  state => ({
    displayName: state.user.displayName,
    refereeCenter: state.user.refereeCenter,
    email: state.user.email,
    photoURI: state.user.photoURL
  }),
  {
    loginOut: logOut
  }
)(UserMenuView);

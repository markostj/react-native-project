import React, { useState } from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { connect } from 'react-redux';

import { ApplicationState } from '../redux/store';

import { Navigation } from '../components/Navigation';

import { CirclesLoader, TextLoader } from 'react-native-indicator';

type Props = NavigationScreenProps & ReduxProps;

interface ReduxProps {
  displayName: string;
  refereeCenter: string;
  email: string;
  photoURI: string;
}

const UserMenuView: React.FC<Props> = ({
  navigation,
  displayName,
  refereeCenter,
  email,
  photoURI
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={navigateToChangeAvatarView}>
          <Image
            style={styles.headerImg}
            source={{
              uri: photoURI
            }}
          />
        </TouchableOpacity>
        <Text style={styles.headerName}>{displayName}</Text>
        <Text style={styles.headerName}>{email}</Text>
        <Text style={styles.headerCenter}> {refereeCenter}</Text>
      </View>
      <View>
        <Navigation
          value="Avatar"
          colorBg="#00ffff"
          text="Promijeni profilnu sliku"
          size={25}
          {...navigation}
        />
        <Navigation
          value="ChangeEmail"
          colorBg="#0080ff"
          text="Promijeni email"
          size={25}
          {...navigation}
        />
        <Navigation
          value="UserGames"
          colorBg="#6600cc"
          text="Prijašnje utakmice"
          size={25}
          {...navigation}
        />
      </View>
    </SafeAreaView>
  );

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

export default connect<ReduxProps, null, null, ApplicationState>(
  state => ({
    displayName: state.user.displayName,
    refereeCenter: state.user.refereeCenter,
    email: state.user.email,
    photoURI: state.user.photoURL
  }),
  {}
)(UserMenuView);

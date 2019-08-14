import React, { useState } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
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
        <Image
          style={styles.headerImg}
          source={{
            uri: photoURI
          }}
        />
        <Text style={styles.headerName}>{displayName}</Text>
        <Text style={styles.headerName}>{email}</Text>
        <Text style={styles.headerCenter}> {refereeCenter}</Text>
      </View>
      <View>
        <Navigation
          value="Avatar"
          colorBg="#05a05a"
          text="Promijeni profilnu sliku"
          size={25}
          {...navigation}
        />
        <Navigation
          value="ChangeEmail"
          colorBg="#bf3eff"
          text="Promijeni email"
          size={25}
          {...navigation}
        />
        <Navigation
          value="Games"
          colorBg="#f4511e"
          text="Prijašnje utakmice"
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

export default connect<ReduxProps, null, null, ApplicationState>(
  state => ({
    displayName: state.user.displayName,
    refereeCenter: state.user.refereeCenter,
    email: state.user.email,
    photoURI: state.user.photoURL
  }),
  {}
)(UserMenuView);

import React, { useState } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { connect } from 'react-redux';

import { ApplicationState } from '../redux/store';

import { Navigation } from '../components/Navigation';

import { CirclesLoader, TextLoader } from 'react-native-indicator';

type Props = NavigationScreenProps & ReduxProps;

interface ReduxProps {
  userName: string;
  userCenter: string;
  authUser: boolean;
  photoURI: string;
}

const UserMenuView: React.FC<Props> = ({
  navigation,
  userName,
  userCenter,
  authUser,
  photoURI
}) => {
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
      <View style={styles.header}>
        <Image
          style={styles.headerImg}
          source={{
            uri: photoURI
          }}
        />
        <Text style={styles.headerName}>Marko</Text>
        <Text style={styles.headerCenter}> OS</Text>
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
          value="Games"
          colorBg="#bf3eff"
          text="Pokaži prijašnje utakmice"
          size={25}
          {...navigation}
        />
        <Navigation
          value="RecordMenu"
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

export default connect<ReduxProps, null, null, ApplicationState>(
  state => ({
    userName: state.user.name,
    userCenter: state.user.center,
    authUser: state.user.authenticated,
    photoURI: state.user.photoURL
  }),
  {}
)(UserMenuView);

import React, { useState, useEffect } from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { connect } from 'react-redux';

import { ApplicationState } from '../redux/store';

import { Navigation } from '../components/Navigation';

import { CirclesLoader, TextLoader } from 'react-native-indicator';

import { logOut } from '../redux/userThunks';

type Props = NavigationScreenProps & ReduxProps & DispatchProps;

interface ReduxProps {
  userName: string;
  userCenter: string;
  authUser: boolean;
  photoURI: string;
}

interface DispatchProps {
  logOut: () => void;
}

const HomepageView: React.FC<Props> = ({
  navigation,
  userName,
  userCenter,
  authUser,
  photoURI,
  logOut
}) => {
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
          value="UserMenu"
          colorBg="#05a05a"
          text="Profil"
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
        <TouchableHighlight
          onPress={handleLogOut}
          style={styles.logOutBtn}
          underlayColor={'#8F8F8F'}
        >
          <Text style={styles.logOutText}>Odlogiraj se</Text>
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
    userName: state.user.name,
    userCenter: state.user.center,
    authUser: state.user.authenticated,
    photoURI: state.user.photoURL
  }),
  {
    logOut
  }
)(HomepageView);

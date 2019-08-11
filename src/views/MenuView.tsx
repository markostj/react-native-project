import React, { useEffect } from 'react';

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
import { FirebaseAuth } from '../firebase/FirebaseService';

import { logOut } from '../redux/userThunks';

type Props = NavigationScreenProps & ReduxProps & DispatchProps;

interface ReduxProps {
  userName: string;
  userCenter: string;
  urlPic: string;
  authenticated: boolean;
}

interface DispatchProps {
  logOut: () => void;
}

const MenuView: React.FC<Props> = ({
  navigation,
  userName,
  userCenter,
  urlPic,
  authenticated,
  logOut
}) => {
  useEffect(() => {
    if (!authenticated) {
      navigation.navigate('App');
    }
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.headerImg} source={{ uri: urlPic }} />
        <Text style={styles.headerName}>{userName}</Text>
        <Text style={styles.headerCenter}> {userCenter}</Text>
      </View>

      <View>
        <Navigation
          value="Camera"
          colorBg="#6666ff"
          text="Slikaj"
          size={30}
          {...navigation}
        />
        <Navigation
          value="Record"
          colorBg="#00cc00"
          text="Napiši zapisnik"
          size={30}
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

  /**
   * Should this be also thunk ?
   * Is this async form correct?
   */
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
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerImg: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center'
  },
  headerName: {
    marginTop: 10,
    fontSize: 20
  },
  headerCenter: {
    fontSize: 15
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
    fontSize: 30
  }
});

export default connect<ReduxProps, DispatchProps, null, ApplicationState>(
  state => ({
    userName: state.user.name,
    userCenter: state.user.center,
    urlPic: state.user.urlPic,
    authenticated: state.user.authenticated
  }),
  {
    logOut
  }
)(MenuView);

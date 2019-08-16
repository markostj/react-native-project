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

import { CirclesLoader, TextLoader } from 'react-native-indicator';

import { logOut } from '../redux/userThunks';

import { UserActions } from '../redux/userActions';

type Props = NavigationScreenProps & ReduxProps & DispatchProps;

interface ReduxProps {
  displayName: string;
  refereeCenter: string;
  authUser: boolean;
  photoURI: string;
  email: string;
}

interface DispatchProps {
  logOut: () => void;
  setAvatar: (name: string, value: string) => void;
}

const HomepageView: React.FC<Props> = ({
  navigation,
  displayName,
  refereeCenter,
  authUser,
  photoURI,
  logOut,
  email,
  setAvatar
}) => {
  useEffect(() => {
    if (!authUser) {
      navigation.navigate('Login');
    }
  });

  if (!authUser || !displayName || !email) {
    return (
      <View style={styles.container}>
        <CirclesLoader size={100} />
        <TextLoader text="Loading" />
      </View>
    );
  }

  if (photoURI === '') {
    setAvatar(
      'photoURL',
      'https://firebasestorage.googleapis.com/v0/b/ns-zapisnik.appspot.com/o/profilePic.png?alt=media&token=301ce583-5c7b-49fe-8a70-09f1309c9bf3'
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
        <Text style={styles.headerName}>{displayName}</Text>
        <Text style={styles.headerName}>{email}</Text>
        <Text style={styles.headerCenter}> {refereeCenter}</Text>
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
    displayName: state.user.displayName,
    refereeCenter: state.user.refereeCenter,
    email: state.user.email,
    authUser: state.user.authenticated,
    photoURI: state.user.photoURL
  }),
  {
    logOut,
    setAvatar: UserActions.userInfo
  }
)(HomepageView);

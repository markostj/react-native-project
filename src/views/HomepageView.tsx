import React, { useEffect } from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { connect } from 'react-redux';

import { ApplicationState } from '../redux/store';

import { Navigation } from '../components/Navigation';

import { CirclesLoader, TextLoader } from 'react-native-indicator';

import { logOut } from '../redux/users/userThunks';

import { UserActions } from '../redux/users/userActions';

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

  // Don't know how to just change profile pic because if we use pic from folder
  // we have to use require

  if (photoURI === '') {
    setAvatar(
      'photoURL',
      'https://firebasestorage.googleapis.com/v0/b/ns-zapisnik.appspot.com/o/profilePic.png?alt=media&token=301ce583-5c7b-49fe-8a70-09f1309c9bf3'
    );
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={navigateToChangeAvatarView}>
            <Image
              style={styles.headerImg}
              source={require('assets/img/newProfilePic.jpeg')}
            />
          </TouchableOpacity>
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
  }

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
          value="UserMenu"
          colorBg="#0000ff"
          text="Profil"
          size={25}
          {...navigation}
        />
        <Navigation
          value="RecordMenu"
          colorBg="#DB7093"
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

  function navigateToChangeAvatarView() {
    navigation.navigate('Avatar');
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
    width: 200,
    height: 200,
    borderRadius: 100
  },
  headerName: {
    marginTop: 10,
    fontSize: 20
  },
  headerCenter: {
    fontSize: 15,
    marginBottom: 10
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

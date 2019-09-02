import React, { useEffect } from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Button
} from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { connect } from 'react-redux';

import { ApplicationState } from '../redux/store';

import { Navigation } from '../components/Navigation';

import { CirclesLoader, TextLoader } from 'react-native-indicator';

import { UserActions } from '../redux/users/userActions';

type Props = NavigationScreenProps & ReduxProps & DispatchProps;

interface ReduxProps {
  displayName: string;
  refereeCenter: string;
  authUser: boolean;
  photoURI: string;
  email: string;
  uid: string;
}

interface DispatchProps {
  setAvatar: (name: string, value: string) => void;
}

const HomepageView: React.FC<Props> = ({
  navigation,
  displayName,
  refereeCenter,
  authUser,
  photoURI,
  email,
  setAvatar,
  uid
}) => {
  useEffect(() => {
    console.log(uid);
    if (!authUser) {
      navigation.navigate('Login');
    }
    if (uid === 'OENvU8IGw9TeiQ0N9PG7EVdnuMG3') {
      navigation.navigate('Admin');
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
          <Text style={styles.headerName}>{displayName}</Text>
          <TouchableOpacity onPress={navigateToChangeAvatarView}>
            <Image
              style={styles.headerImg}
              source={require('assets/img/newProfilePic.jpeg')}
            />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerName}>{email}</Text>
            <Text style={styles.headerCenter}> {refereeCenter}</Text>
          </View>
        </View>
        <View style={styles.buttons}>
          <Navigation
            value="UserMenu"
            colorBg="#0000ff"
            text="Profil"
            size={14}
            {...navigation}
          />
          <Navigation
            value="RecordMenu"
            colorBg="#ffffff"
            text="Odaberi vrstu zapisnika"
            size={14}
            {...navigation}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
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
          <Text style={styles.headerEmail}>{email}</Text>
          <Text style={styles.headerCenter}> {refereeCenter}</Text>
        </View>
      </View>
      <View style={styles.buttons}>
        <Navigation
          value="UserMenu"
          colorBg="#0000ff"
          text="Profil"
          size={14}
          {...navigation}
        />
        <Navigation
          value="RecordMenu"
          colorBg="#ffffff"
          text="Odaberi vrstu zapisnika"
          size={14}
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
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerImg: {
    width: 220,
    height: 220,
    borderRadius: 110
  },
  headerName: {
    fontSize: 22,
    marginBottom: 25
  },
  headerEmail: {
    marginTop: 20,
    fontSize: 22,
    marginBottom: 10
  },
  headerCenter: {
    fontSize: 20,
    textAlign: 'center'
  },
  buttons: {
    flexDirection: 'row'
  }
});

export default connect<ReduxProps, DispatchProps, null, ApplicationState>(
  state => ({
    displayName: state.user.displayName,
    refereeCenter: state.user.refereeCenter,
    email: state.user.email,
    authUser: state.user.authenticated,
    photoURI: state.user.photoURL,
    uid: state.user.uid
  }),
  {
    setAvatar: UserActions.userInfo
  }
)(HomepageView);

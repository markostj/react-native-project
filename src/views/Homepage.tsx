import React, { useEffect, useState } from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  Alert
} from 'react-native';
import { connect } from 'react-redux';
import { NavigationScreenProps, NavigationEvents } from 'react-navigation';

import { ApplicationState } from '../redux/store';

import { GetUserActions } from '../redux/userActions';

import { signIn } from '../redux/userThunks';
import { FirebaseAuth } from '../firebase/FirebaseService';
import { auth } from 'firebase';

type Props = NavigationScreenProps & DispatchProps & ReduxProps;

interface ReduxProps {
  authenticated: boolean;
  error: string;
}
interface DispatchProps {
  signIn: (email: string, password: string) => void;
}

const Homepage: React.FC<Props> = ({
  navigation,
  signIn,
  authenticated,
  error
}) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  console.log(`Authenticated je : ${authenticated}`);

  useEffect(() => {
    /*   if (error !== '') {
      Alert.alert(error);
    } */
    if (authenticated) {
      setEmail('');
      setPassword('');
      navigation.navigate('Location');
    }
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.body}>
        <Image
          style={styles.bodyImg}
          source={require('C:/Users/marko/OneDrive/Desktop/Projekt/src/assets/img/hns.png')}
        />
        <Text style={styles.bodyTitle}>NS Zapisnik</Text>
        <View style={styles.bodyLogIn}>
          <TextInput
            style={styles.bodyForm}
            placeholder="Email"
            maxLength={40}
            value={email}
            onChangeText={handleNameChange}
          />
          <TextInput
            secureTextEntry={true}
            style={styles.bodyPassword}
            placeholder="Password"
            maxLength={20}
            value={password}
            onChangeText={handlePasswordChange}
          />
        </View>

        <TouchableHighlight
          onPress={handleSubmit}
          style={styles.footerBtn}
          underlayColor={'#8F8F8F'}
        >
          <Text style={styles.footerBtnText}>Log In</Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={forgotPassword}
          style={styles.footerBtn}
          underlayColor={'#8F8F8F'}
        >
          <Text style={styles.footerBtnText}>Forgot Password</Text>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );

  function handleNameChange(text: string) {
    /* setEmail(...state, [prop]: text); */
    setEmail(text);
  }

  function handlePasswordChange(text: string) {
    setPassword(text);
  }

  /**
   * How to make async for navigation?
   * Because it goes to Location even if we are not loged in
   */
  function handleSubmit() {
    signIn(email, password);
    setEmail('');
    setPassword('');
    /*    navigation.navigate('Location'); */
  }

  function forgotPassword() {
    navigation.navigate('ForgotPassword');
  }
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flex: 1
  },
  body: {
    backgroundColor: '#C4C4C4',
    flex: 9,
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  bodyImg: {
    width: 80,
    height: 80,
    overflow: 'visible' // Behave like it is hidden??
  },
  bodyTitle: {
    color: '#9E1700',
    textAlign: 'center',
    fontSize: 40
  },
  bodyLogIn: {},
  bodyForm: {
    backgroundColor: '#fff',
    marginLeft: 10,
    marginRight: 10,
    color: '#000',
    fontSize: 25,
    textAlign: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    width: 300
  },
  bodyPassword: {
    backgroundColor: '#fff',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    color: '#000',
    fontSize: 25,
    textAlign: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    width: 300
  },
  footerBtn: {
    marginLeft: 20,
    marginRight: 20,
    padding: 5,
    backgroundColor: 'transparent'
  },
  footerBtnText: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 30
  }
});

export default connect<any, DispatchProps, null, ApplicationState>(
  state => ({
    authenticated: state.user.authenticated,
    error: state.user.error
  }),
  {
    signIn
  }
)(Homepage);

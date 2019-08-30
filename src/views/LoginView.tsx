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
import { NavigationScreenProps } from 'react-navigation';

import { ApplicationState } from '../redux/store';

import { signIn } from '../redux/users/userThunks';
import { UserActions } from '../redux/users/userActions';
import { FirebaseAuth } from '../firebase/FirebaseService';

type Props = NavigationScreenProps & DispatchProps & ReduxProps;

interface ReduxProps {
  authenticated: boolean;
  error: string;
}
interface DispatchProps {
  signIn: (email: string, password: string) => void;
  getError: (error: string) => void;
  isPasswordReset: (reset: boolean) => void;
}

const LoginView: React.FC<Props> = ({
  navigation,
  signIn,
  authenticated,
  error,
  getError,
  isPasswordReset
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailVal, setEmailVal] = useState('');

  useEffect(() => {
    if (error) {
      Alert.alert(error);
    }
    if (authenticated) {
      if (FirebaseAuth.currentUser) {
        const userUID = FirebaseAuth.currentUser.uid;
        if (userUID === 'OENvU8IGw9TeiQ0N9PG7EVdnuMG3') {
          setEmail('');
          setPassword('');
          navigation.navigate('Admin');
          return;
        }
      }

      setEmail('');
      setPassword('');
      navigation.navigate('Homepage');
    }
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.body}>
        <Image
          style={styles.bodyImg}
          source={require('assets/img/hns-login.png')}
        />
        <Text style={styles.bodyTitle}>NS Zapisnik</Text>
        <View>
          <TextInput
            style={styles.bodyForm}
            placeholder="Email"
            maxLength={40}
            value={email}
            onChangeText={handleEmailChange}
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
        <Text style={styles.emailVal}> {emailVal}</Text>
        <TouchableHighlight
          onPress={handleSubmit}
          style={styles.footerBtn}
          underlayColor={'transparent'}
        >
          <Text style={styles.footerBtnText}>Log In</Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={forgotPassword}
          style={styles.footerBtn}
          underlayColor={'transparent'}
        >
          <Text style={[styles.footerBtnText, styles.forgotPassBtn]}>
            Forgot Password
          </Text>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );

  function handleEmailChange(text: string) {
    getError('');
    const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (reg.test(text) === false) {
      setEmailVal('Email format is Not Correct');
      setEmail(text);
      return false;
    } else {
      setEmail(text);
      setEmailVal('');
    }
  }

  function handlePasswordChange(text: string) {
    getError('');
    setPassword(text);
  }

  function handleSubmit() {
    signIn(email, password);
  }

  function forgotPassword() {
    navigation.navigate('ForgotPassword');
    isPasswordReset(false);
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
    width: '30%',
    height: '30%'
  },
  bodyTitle: {
    color: '#9E1700',
    textAlign: 'center',
    fontSize: 40
  },
  bodyForm: {
    backgroundColor: '#fff',
    color: '#000',
    fontSize: 19,
    textAlign: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    width: 300
  },
  bodyPassword: {
    backgroundColor: '#fff',
    marginTop: 5,
    color: '#000',
    fontSize: 19,
    textAlign: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    width: 300
  },
  footerBtn: {
    padding: 10,
    backgroundColor: 'transparent'
  },
  footerBtnText: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 30
  },
  forgotPassBtn: {
    fontSize: 20
  },
  emailVal: {
    marginTop: 10,
    color: 'red',
    fontSize: 20
  }
});

export default connect<ReduxProps, DispatchProps, null, ApplicationState>(
  state => ({
    authenticated: state.user.authenticated,
    error: state.user.error
  }),
  {
    signIn,
    getError: UserActions.error,
    isPasswordReset: UserActions.passwordIsReset
  }
)(LoginView);

import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  Alert
} from 'react-native';
import { connect } from 'react-redux';
import { NavigationScreenProps } from 'react-navigation';

import { ApplicationState } from '../redux/store';

import { changeEmail } from '../redux/users/userThunks';
import { UserActions } from '../redux/users/userActions';

type Props = NavigationScreenProps & DispatchProps & ReduxProps;

interface ReduxProps {
  auth: boolean;
  error: string;
  oldEmail: string;
}
interface DispatchProps {
  changeEmail: (email: string) => void;
  setError: (error: string) => void;
}

const ChangeEmailPasswordView: React.FC<Props> = ({
  navigation,
  changeEmail,
  auth,
  error,
  setError,
  oldEmail
}) => {
  const [email, setEmail] = useState('');
  const [emailVal, setEmailVal] = useState('');

  // Fix error why if email format is not ok it returns you to MenuView

  useEffect(() => {
    if (!auth) {
      Alert.alert('Promijenjen je email');
      navigation.navigate('Login');
    }
    if (error && email !== '') {
      Alert.alert(error);
    }
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={[styles.title, styles.bold]}>Old Email: {oldEmail} </Text>
      <Text style={styles.title}>Write your new email</Text>
      <TextInput
        style={styles.textInput}
        placeholder="New Email"
        maxLength={40}
        value={email}
        onChangeText={handleEmailChange}
      />

      <Text style={styles.emailVal}> {emailVal}</Text>

      <TouchableHighlight
        onPress={handleSubmit}
        style={styles.submit}
        underlayColor={'#0000ff'}
      >
        <Text style={styles.submitText}>Change your email</Text>
      </TouchableHighlight>
    </SafeAreaView>
  );

  function handleEmailChange(text: string) {
    setError('');
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

  function handleSubmit() {
    changeEmail(email);
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 25,
    textAlign: 'center'
  },
  textInput: {
    backgroundColor: '#fff',
    marginTop: 10,
    color: '#000',
    fontSize: 19,
    textAlign: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    width: 300
  },
  submit: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'black',
    marginTop: 30,
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
    width: 150,
    height: 50,
    backgroundColor: '#0000ff'
  },
  submitText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 14
  },
  emailVal: {
    marginTop: 10,
    color: 'red',
    fontSize: 20
  },
  bold: {
    fontWeight: 'bold'
  }
});

export default connect<ReduxProps, DispatchProps, null, ApplicationState>(
  state => ({
    auth: state.user.authenticated,
    error: state.user.error,
    oldEmail: state.user.email
  }),
  {
    changeEmail,
    setError: UserActions.error
  }
)(ChangeEmailPasswordView);

import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { TextInput, TouchableHighlight } from 'react-native-gesture-handler';
import { FirebaseAuth } from '../firebase/FirebaseService';
import { connect } from 'react-redux';
import { passwordReset } from '../redux/userThunks';
import { ApplicationState } from '../redux/store';
import { GetUserActions } from '../redux/userActions';

type Props = NavigationScreenProps & DispatchProps & ReduxProps;

interface ReduxProps {
  error: string;
  reset: boolean;
}

interface DispatchProps {
  passwordReset: (email: string) => void;
  getError: (error: string) => void;
}

const ForgotPasswordView: React.FC<Props> = ({
  navigation,
  error,
  reset,
  passwordReset,
  getError
}) => {
  const [email, setEmail] = useState('');
  const [emailVal, setEmailVal] = useState('');

  useEffect(() => {
    if (reset) {
      Alert.alert('Provjerite mail');
      navigation.navigate('Login');
    }
    if (error && email !== '') {
      Alert.alert(error);
    }
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Write your email to send password reset mail
      </Text>
      <TextInput
        style={styles.textInput}
        placeholder="Your Email"
        maxLength={40}
        value={email}
        onChangeText={handleEmailChange}
      />
      <Text style={styles.emailVal}> {emailVal}</Text>
      <TouchableHighlight
        onPress={handleSubmit}
        style={styles.submit}
        underlayColor={'#8F8F8F'}
      >
        <Text style={styles.submitText}>Send Email</Text>
      </TouchableHighlight>
    </View>
  );

  function handleEmailChange(text: string) {
    getError('');
    console.log(text);
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      setEmailVal('Email is Not Correct');
      setEmail(text);
      return false;
    } else {
      setEmail(text);
      setEmailVal('');
    }
  }

  function handleSubmit() {
    passwordReset(email);
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#C4C4C4',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textInput: {
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
  title: {
    fontSize: 25,
    textAlign: 'center'
  },
  submit: {
    borderWidth: 1,
    borderColor: 'black',
    marginTop: 30,
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#fff'
  },
  submitText: {
    color: '#000',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20
  },
  emailVal: {
    color: 'red',
    fontSize: 30
  }
});

export default connect<ReduxProps, DispatchProps, null, ApplicationState>(
  state => ({
    error: state.user.error,
    reset: state.user.resetPassword
  }),
  {
    passwordReset,
    getError: GetUserActions.error
  }
)(ForgotPasswordView);

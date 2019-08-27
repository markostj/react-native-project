import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { TextInput, TouchableHighlight } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { passwordReset } from '../redux/users/userThunks';
import { ApplicationState } from '../redux/store';
import { UserActions } from '../redux/users/userActions';

type Props = NavigationScreenProps & DispatchProps & ReduxProps;

interface ReduxProps {
  error: string;
  isPasswordReset: boolean;
}

interface DispatchProps {
  passwordReset: (email: string) => void;
  setError: (error: string) => void;
}

const ForgotPasswordView: React.FC<Props> = ({
  navigation,
  error,
  isPasswordReset,
  passwordReset,
  setError
}) => {
  const [email, setEmail] = useState('');
  const [emailVal, setEmailVal] = useState('');

  console.log(`PasswordResetBool : ${isPasswordReset}`);

  useEffect(() => {
    if (isPasswordReset) {
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
    setError('');
    console.log(text);
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
    isPasswordReset: state.user.passwordIsReset
  }),
  {
    passwordReset,
    setError: UserActions.error
  }
)(ForgotPasswordView);

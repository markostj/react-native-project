import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { TextInput, TouchableHighlight } from 'react-native-gesture-handler';
import { FirebaseAuth } from '../firebase/FirebaseService';
import { connect } from 'react-redux';
import { passwordReset } from '../redux/userThunks';
import { ApplicationState } from '../redux/store';

type Props = NavigationScreenProps & DispatchProps & ReduxProps;

interface ReduxProps {
  error: string;
  reset: boolean;
}

interface DispatchProps {
  passwordReset: (email: string) => void;
}

const ForgotPasswordView: React.FC<Props> = ({
  navigation,
  error,
  reset,
  passwordReset
}) => {
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (reset) {
      Alert.alert('Provjerite mail');
      navigation.navigate('App');
    }
    if (error !== '') {
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
        onChangeText={handleChange}
      />
      <TouchableHighlight
        onPress={handleSubmit}
        style={styles.submit}
        underlayColor={'#8F8F8F'}
      >
        <Text style={styles.submitText}>Send Email</Text>
      </TouchableHighlight>
    </View>
  );

  function handleChange(text: string) {
    setEmail(text);
  }

  /**
   * Dont know if this is correct or I should use then here?
   */
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
  }
});

export default connect<ReduxProps, DispatchProps, null, ApplicationState>(
  state => ({
    error: state.user.error,
    reset: state.user.resetPassword
  }),
  {
    passwordReset
  }
)(ForgotPasswordView);

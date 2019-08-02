import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import { connect } from 'react-redux';
import { NavigationScreenProps } from 'react-navigation';
import { ApplicationState } from '../redux/store';
import { TextInput, TouchableHighlight } from 'react-native-gesture-handler';
import { GetUserActions } from '../redux/userActions';
import { itemsFetchData } from '../redux/userActions';
import { FirebaseAuth, FirebaseDatabase } from '../firebase/FirebaseService';

type Props = NavigationScreenProps;

const ForgotPasswordView: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');

  console.log(email);
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

  function handleSubmit() {
    FirebaseAuth.sendPasswordResetEmail(email)
      .then(() => Alert.alert('Please check your email...'))
      .then(() => navigation.navigate('App'))
      .catch(error => Alert.alert(error.message));
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

export default ForgotPasswordView;

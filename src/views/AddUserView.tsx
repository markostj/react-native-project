import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  Alert
} from 'react-native';
import { NavigationScreenProps, ScrollView } from 'react-navigation';

import { FormInput } from '../components/FormInput';
import { NewUser } from '../models/NewUser';
import { FirebaseDatabase, FirebaseAuth } from '../firebase/FirebaseService';

type Props = NavigationScreenProps;

const AddUserView: React.FC<Props> = ({ navigation }) => {
  const [newUserState, setNewUserState] = useState(new NewUser());

  const isValid = Object.keys(newUserState).every(
    key => newUserState[key].length > 0
  );

  /**
   * Vidjet jel se treba dodat na firebase uid isto tj da ima polje za uid a to da mu se pošalje kod kreiranja korisnika
   * Spojit usera s kolekcijom user i to da moze dohvacat podatke
   * ali moram vidjet kako dobit uid kad se kreira novi korisnik da mogu proslijedit
   */
  const [error, setError] = useState('');

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Novi korisnik</Text>
        <View style={styles.containerForm}>
          <FormInput
            title="Ime i prezime"
            titleStyle="normal"
            handleChangeCallback={handleChange}
            placeholder="Ime i prezime"
            value={newUserState.name}
            size="small"
            propName="name"
            maxLength={30}
          />
        </View>
        <View style={styles.containerForm}>
          <FormInput
            title="Email"
            titleStyle="normal"
            handleChangeCallback={handleChange}
            placeholder="Email"
            value={newUserState.email}
            propName="email"
            size="small"
            maxLength={30}
          />
        </View>
        <View style={styles.containerForm}>
          <FormInput
            title="Password"
            titleStyle="normal"
            handleChangeCallback={handleChange}
            placeholder="Password"
            value={newUserState.password}
            propName="password"
            size="small"
            maxLength={10}
          />
        </View>
        <View style={styles.containerForm}>
          <FormInput
            title="Godište"
            titleStyle="normal"
            handleChangeCallback={handleChange}
            placeholder="Godište"
            value={newUserState.birth}
            propName="birth"
            size="small"
            maxLength={5}
          />
        </View>
        <View style={styles.containerForm}>
          <FormInput
            title="Nogometno središte"
            titleStyle="normal"
            handleChangeCallback={handleChange}
            placeholder="Nogometno središte"
            value={newUserState.refereeCenter}
            propName="refereeCenter"
            size="small"
            maxLength={30}
          />
        </View>
        <View style={styles.containerForm}>
          <FormInput
            title="Broj mobitela"
            titleStyle="normal"
            handleChangeCallback={handleChange}
            placeholder="Broj mobitela"
            value={newUserState.number}
            propName="number"
            size="small"
            maxLength={10}
          />
        </View>

        <View>
          <Text style={styles.error}> {error} </Text>
          <TouchableHighlight
            style={[styles.button, styles.blue]}
            onPress={check}
            underlayColor={'#8F8F8F'}
          >
            <Text style={[styles.text, styles.white]}>Dodaj korisnika</Text>
          </TouchableHighlight>
        </View>
      </View>
    </ScrollView>
  );

  /**
   * U kolekciju users snimit pod imenom UID sto mu dodijeli firebase
   */
  function check() {
    if (!isValid) {
      setError('Ostavili ste polje prazno');
      alertError();
    } else {
      setError('');
      FirebaseAuth.createUserWithEmailAndPassword(
        newUserState.email,
        newUserState.password
      )
        .catch(errorAuth => {
          Alert.alert(errorAuth.message);
        })

        .then(() => {
          FirebaseDatabase.collection('users')
            .doc('blblabnekiUID')
            .set({
              name: newUserState.name,
              email: newUserState.email,
              password: newUserState.password,
              birth: newUserState.birth,
              refereeCenter: newUserState.refereeCenter,
              number: newUserState.number,
              // UID KOJI CEMO DOBIT
              uid: 'blablabla'
            })
            .then(() => Alert.alert('Novi korisnik je uspješno dodan'))
            .then(() => navigation.navigate('Admin'))
            .catch(errorText =>
              console.error('Error writing document: ', errorText)
            );
        });
    }
  }

  function handleChange(propName: string, value: string) {
    setNewUserState({ ...newUserState, [propName]: value });
  }

  function alertError() {
    Alert.alert(
      'Pogreška',
      'Ostavili ste jedno ili više polja prazno',
      [{ text: 'OK' }],
      { cancelable: false }
    );
  }
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 40,
    marginBottom: 30
  },
  containerForm: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 30
  },
  containerTitle: {
    fontSize: 20,
    width: 200,
    flexWrap: 'wrap',
    textAlign: 'center'
  },
  margin: {
    marginBottom: 10
  },
  error: {
    fontSize: 30,
    color: 'red'
  },
  button: {
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 20,
    padding: 20
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 30
  },
  white: {
    color: '#fff'
  },
  blue: {
    backgroundColor: '#66ffff'
  }
});

export default AddUserView;
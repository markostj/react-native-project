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
import { Record } from '../models/Record';
import { FirebaseDatabase } from '../firebase/FirebaseService';
import GetLocation from 'react-native-get-location';
import Geocoder from 'react-native-geocoding';

Geocoder.init('AIzaSyAOwmI18jGOgTZBJX11b9Bbq0Y7HZI0898');

type Props = NavigationScreenProps;

const RecordView: React.FC<Props> = ({ navigation }) => {
  const [recordState, setRecordState] = useState(new Record());
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [mjesto, setMjesto] = useState('');
  const [ulica, setUlica] = useState('');

  const isValid = Object.keys(recordState).every(
    key => recordState[key].length > 0
  );

  const [error, setError] = useState('');
  const today = new Date();
  const time = new Date().getTime();

  useEffect(() => {
    if (recordState.date === '') {
      setRecordState({
        ...recordState,
        date: `${today.getDate().toString()}.${(
          today.getMonth() + 1
        ).toString()}.${today.getFullYear().toString()}.`
      });
    }
  });

  if (recordState.place === '') {
    Location();
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Zapisnik</Text>
        <View style={styles.containerForm}>
          <Text style={styles.text}>Datum: {recordState.date}</Text>
        </View>
        <Text style={styles.locationText}>
          Trenutna adresa:{ulica}, {mjesto}
        </Text>
        <View style={styles.containerForm}>
          <FormInput
            title="Liga"
            titleStyle="normal"
            handleChangeCallback={handleChange}
            placeholder="Liga"
            value={recordState.league}
            size="small"
            propName="league"
            maxLength={30}
          />
        </View>
        <View style={styles.containerForm}>
          <FormInput
            title="Kolo"
            titleStyle="normal"
            handleChangeCallback={handleChange}
            placeholder="Kolo"
            value={recordState.round}
            propName="round"
            size="small"
            maxLength={3}
          />
        </View>
        <Text style={[styles.containerTitle, styles.margin]}>
          Utakmica između klubova
        </Text>
        <View style={styles.containerForm}>
          <FormInput
            title=""
            titleStyle="none"
            handleChangeCallback={handleChange}
            placeholder="Domaćin"
            value={recordState.homeTeam}
            propName="homeTeam"
            size="small"
            maxLength={30}
          />
          <FormInput
            title=""
            titleStyle="none"
            handleChangeCallback={handleChange}
            placeholder="Gost"
            value={recordState.awayTeam}
            propName="awayTeam"
            size="small"
            maxLength={30}
          />
        </View>
        <View style={styles.containerForm}>
          <FormInput
            title="Sudac"
            titleStyle="normal"
            handleChangeCallback={handleChange}
            placeholder="Sudac"
            value={recordState.referee}
            propName="referee"
            size="small"
            maxLength={30}
          />
        </View>
        <View style={styles.containerForm}>
          <FormInput
            title="1. Pomoćni"
            titleStyle="normal"
            handleChangeCallback={handleChange}
            placeholder="1. Pomoćni"
            value={recordState.firstAssistant}
            propName="firstAssistant"
            size="small"
            maxLength={30}
          />
        </View>
        <View style={styles.containerForm}>
          <FormInput
            title="2. Pomoćni"
            titleStyle="normal"
            handleChangeCallback={handleChange}
            placeholder="2. Pomoćni"
            value={recordState.secondAssistant}
            propName="secondAssistant"
            size="small"
            maxLength={30}
          />
        </View>
        <View style={styles.containerForm}>
          <FormInput
            title="Delegat"
            titleStyle="normal"
            handleChangeCallback={handleChange}
            placeholder="Delegat"
            value={recordState.delegate}
            propName="delegate"
            size="small"
            maxLength={30}
          />
        </View>
        <View style={styles.containerForm}>
          <FormInput
            title="Domaći predstavnik kluba"
            titleStyle="normal"
            handleChangeCallback={handleChange}
            placeholder="Predstavnik"
            value={recordState.homeRepresentative}
            propName="homeRepresentative"
            size="small"
            maxLength={30}
          />
        </View>
        <View style={styles.containerForm}>
          <FormInput
            title="Gost predstavnik"
            titleStyle="normal"
            handleChangeCallback={handleChange}
            placeholder="Predstavnik"
            value={recordState.awayRepresentative}
            propName="awayRepresentative"
            size="small"
            maxLength={30}
          />
        </View>
        <FormInput
          title="Domaće opomene"
          titleStyle="margin"
          handleChangeCallback={handleChange}
          placeholder="Domaće opomene"
          value={recordState.homeYellow}
          propName="homeYellow"
          size="big"
          maxLength={500}
        />
        <FormInput
          title="Gostujuće opomene"
          titleStyle="margin"
          handleChangeCallback={handleChange}
          placeholder="Gostujuće opomene"
          value={recordState.awayYellow}
          propName="awayYellow"
          size="big"
          maxLength={500}
        />
        <FormInput
          title="Domaća isključenja"
          titleStyle="margin"
          handleChangeCallback={handleChange}
          placeholder="Domaća isključenja"
          value={recordState.homeRed}
          propName="homeRed"
          size="medium"
          maxLength={500}
        />
        <FormInput
          title="Gostujuća isključenja"
          titleStyle="margin"
          handleChangeCallback={handleChange}
          placeholder="Gostujuća isključenja"
          value={recordState.awayRed}
          propName="awayRed"
          size="medium"
          maxLength={500}
        />
        <FormInput
          title="Primjedbe"
          titleStyle="margin"
          handleChangeCallback={handleChange}
          placeholder="Primjedbe"
          value={recordState.remarks}
          propName="remarks"
          size="medium"
          maxLength={500}
        />
        <FormInput
          title="Komentar Suca"
          titleStyle="margin"
          handleChangeCallback={handleChange}
          placeholder="Komentar suca"
          value={recordState.comentReferee}
          propName="comentReferee"
          size="medium"
          maxLength={500}
        />
        <View style={styles.containerForm}>
          <FormInput
            title="Rezultat (Domaći:Gosti)"
            titleStyle="normal"
            handleChangeCallback={handleChange}
            placeholder="Rezultat"
            value={recordState.result}
            propName="result"
            size="small"
            maxLength={10}
          />
        </View>
        <View>
          <Text style={styles.error}> {error} </Text>
          <TouchableHighlight
            style={[styles.button, styles.blue]}
            onPress={addNewRecord}
            underlayColor={'#8F8F8F'}
          >
            <Text style={[styles.text, styles.white]}>
              Pošalji u bazu podataka
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    </ScrollView>
  );

  function addNewRecord() {
    if (!isValid) {
      setError('Ostavili ste polje prazno');
      alertError();
      return;
    }

    setError('');

    FirebaseDatabase.collection('records')
      .doc()
      .set({
        date: recordState.date,
        place: recordState.place,
        league: recordState.league,
        round: recordState.round,
        homeTeam: recordState.homeTeam,
        awayTeam: recordState.awayTeam,
        referee: recordState.referee,
        firstAssistant: recordState.firstAssistant,
        secondAssistant: recordState.secondAssistant,
        delegate: recordState.delegate,
        homeRepresentative: recordState.homeRepresentative,
        awayRepresentative: recordState.awayRepresentative,
        homeYellow: recordState.homeYellow,
        awayYellow: recordState.awayYellow,
        homeRed: recordState.homeRed,
        awayRed: recordState.awayRed,
        remarks: recordState.remarks,
        comentReferee: recordState.comentReferee,
        result: recordState.result,
        timestamp: time
      })
      .then(() => navigation.navigate('MyModal'))
      .catch(errorText => console.error('Error writing document: ', errorText));
  }

  function handleChange(propName: string, value: string) {
    setRecordState({ ...recordState, [propName]: value });
  }

  function alertError() {
    Alert.alert(
      'Pogreška',
      'Ostavili ste jedno ili više polja prazno',
      [{ text: 'OK' }],
      { cancelable: false }
    );
  }

  function Location() {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000
    })
      .then((location: { latitude: number; longitude: number }) => {
        const lat = location.latitude;
        const long = location.longitude;
        setLatitude(lat.toFixed(2));
        setLongitude(long.toFixed(2));
      })
      .then(() => {
        fetch(
          'https://maps.googleapis.com/maps/api/geocode/json?address=' +
            latitude +
            ',' +
            longitude +
            '&key=' +
            'AIzaSyAOwmI18jGOgTZBJX11b9Bbq0Y7HZI0898'
        )
          .then(response => response.json())
          .then(responseJson => {
            setUlica(responseJson.results[0].address_components[1].short_name);
            setMjesto(responseJson.results[0].address_components[2].long_name);
          });
      })
      .then(() => {
        setRecordState({ ...recordState, place: ulica + mjesto });
      })

      .catch((error: { code: string; message: string }) => {
        const { code, message } = error;
        console.warn(code, message);
      });
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
  },
  purple: {
    backgroundColor: '#6666ff'
  },
  locationText: {
    textAlign: 'center',
    fontSize: 25
  }
});

export default RecordView;

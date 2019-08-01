import React, { useState } from 'react';
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

import uuid from 'react-native-uuid';

type Props = NavigationScreenProps;

const RecordView: React.FC<Props> = ({ navigation }) => {
  const [recordState, setRecordState] = useState(new Record());
  const [error, setError] = useState('');

  /**
   *  const randUID = uuid.v1();
   * Use this randUID or date for naming docs ??
   */
  const randNumb = (Math.random() * (100000.12 - 0.02) + 0.02).toFixed(4);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Zapisnik</Text>
        <View style={styles.containerForm}>
          <FormInput
            title="Datum"
            titleStyle="normal"
            handleChangeCallback={handleChange}
            placeholder="Datum"
            value={recordState.date}
            size="small"
            propName="date"
            maxLength={15}
          />
        </View>
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
            onPress={check}
            underlayColor={'#8F8F8F'}
          >
            <Text style={[styles.text]}>Pošalji u bazu podataka</Text>
          </TouchableHighlight>
        </View>
      </View>
    </ScrollView>
  );

  /**
   * check - probably can make this better
   */
  function check() {
    if (
      recordState.date.trim() === '' ||
      recordState.league.trim() === '' ||
      recordState.round.trim() === '' ||
      recordState.homeTeam.trim() === '' ||
      recordState.awayTeam.trim() === '' ||
      recordState.referee.trim() === '' ||
      recordState.firstAssistant.trim() === '' ||
      recordState.secondAssistant.trim() === '' ||
      recordState.delegate.trim() === '' ||
      recordState.homeRepresentative.trim() === '' ||
      recordState.awayRepresentative.trim() === '' ||
      recordState.homeYellow.trim() === '' ||
      recordState.awayYellow.trim() === '' ||
      recordState.homeRed.trim() === '' ||
      recordState.awayRed.trim() === '' ||
      recordState.remarks.trim() === '' ||
      recordState.comentReferee.trim() === '' ||
      recordState.result.trim() === ''
    ) {
      setError('Ostavili ste polje prazno');
      alertError();
    } else {
      setError('');
      FirebaseDatabase.collection('records')
        .doc(`${recordState.date}.${+randNumb}`)
        .set({
          date: recordState.date,
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
          result: recordState.result
        })
        .then(() => console.log('Document successfully written!'))
        .then(() => navigation.navigate('MyModal'))
        .catch(errorText =>
          console.error('Error writing document: ', errorText)
        );
    }
  }

  function handleChange(propName: string, value: string) {
    setRecordState({ ...recordState, [propName]: value });
  }

  function alertError() {
    Alert.alert(
      'Pogreška',
      'Ostavili ste jedno ili više polja prazno',
      [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
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
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 30
  },
  blue: {
    backgroundColor: '#66ffff'
  },
  purple: {
    backgroundColor: '#6666ff'
  }
});

export default RecordView;

import React, { useState } from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableHighlight
} from 'react-native';
import { NavigationScreenProps, ScrollView } from 'react-navigation';

import { Navigation } from '../components/Navigation';
import { Form } from '../components/Form';

type Props = NavigationScreenProps;

const Record: React.FC<Props> = ({ navigation }) => {
  const [recordState, setRecordState] = useState({
    date: '',
    league: '',
    round: '',
    homeTeam: '',
    awayTeam: '',
    referee: '',
    firstAssistant: '',
    secondAssistant: '',
    delegate: '',
    homeRepresentative: '',
    awayRepresentative: '',
    homeYellow: '',
    awayYellow: '',
    homeRed: '',
    awayRed: '',
    remarks: '',
    comentReferee: '',
    result: ''
  });

  console.log(recordState);

  function handleNameChange(name: string, value: string) {
    console.log(name, value);
    setRecordState(state => ({ ...state, name: value }));
  }

  function handleLeagueChange(text: string) {
    setRecordState(state => ({ ...state, league: text }));
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Zapisnik</Text>
        <View style={styles.containerForm}>
          <Text style={styles.containerTitle}> Datum </Text>
          <Form
            value={recordState.date}
            name={'date'}
            onChangeText={handleNameChange}
          />
        </View>
        <View style={styles.containerForm}>
          <Text style={styles.containerTitle}> Liga </Text>
          <TextInput
            style={styles.bodyForm}
            placeholder="Liga"
            maxLength={30}
            value={recordState.league}
            onChangeText={handleLeagueChange}
          />
        </View>
        <View style={styles.containerForm}>
          <Text style={styles.containerTitle}> Kolo </Text>
          <TextInput
            style={styles.bodyForm}
            placeholder="Kolo"
            maxLength={3}
            value={recordState.round}
            onChangeText={handleRoundChange}
          />
        </View>
        <Text style={[styles.containerTitle, styles.margin]}>
          Utakmica između klubova
        </Text>
        <View style={styles.containerForm}>
          <TextInput
            style={styles.bodyForm}
            placeholder="Domaćin"
            maxLength={30}
            value={recordState.homeTeam}
            onChangeText={handleHomeChange}
          />
          <TextInput
            style={styles.bodyForm}
            placeholder="Gost"
            maxLength={30}
            value={recordState.awayTeam}
            onChangeText={handleAwayChange}
          />
        </View>
        <View style={styles.containerForm}>
          <Text style={styles.containerTitle}> Sudac </Text>
          <TextInput
            style={styles.bodyForm}
            placeholder="Sudac"
            maxLength={30}
            value={recordState.referee}
            onChangeText={handleRefereeChange}
          />
        </View>
        <View style={styles.containerForm}>
          <Text style={styles.containerTitle}> 1. Pomoćni </Text>
          <TextInput
            style={styles.bodyForm}
            placeholder="1. Pomoćni"
            maxLength={30}
            value={recordState.firstAssistant}
            onChangeText={handleFirstAssistantChange}
          />
        </View>
        <View style={styles.containerForm}>
          <Text style={styles.containerTitle}> 2. Pomoćni </Text>
          <TextInput
            style={styles.bodyForm}
            placeholder="2. Pomoćni"
            maxLength={30}
            value={recordState.secondAssistant}
            onChangeText={handleSecondAssistantChange}
          />
        </View>
        <View style={styles.containerForm}>
          <Text style={styles.containerTitle}> Delegat </Text>
          <TextInput
            style={styles.bodyForm}
            placeholder="Delegat"
            maxLength={30}
            value={recordState.delegate}
            onChangeText={handleDelegateChange}
          />
        </View>
        <View style={styles.containerForm}>
          <Text style={styles.containerTitle}> Domaći predstavnik kluba </Text>
          <TextInput
            style={styles.bodyForm}
            placeholder="Predstavnik"
            maxLength={30}
            value={recordState.homeRepresentative}
            onChangeText={handleHomeRepresentativeChange}
          />
        </View>
        <View style={styles.containerForm}>
          <Text style={styles.containerTitle}> Gost predstavnik </Text>
          <TextInput
            style={styles.bodyForm}
            placeholder="Predstavnik"
            maxLength={30}
            value={recordState.awayRepresentative}
            onChangeText={handleAwayRepresentativeChange}
          />
        </View>
        <Text style={[styles.containerTitle, styles.margin]}>
          Domaće opomene
        </Text>
        <TextInput
          style={[styles.bodyForm, styles.bigForm]}
          placeholder="Domaće opomene"
          maxLength={500}
          multiline={true}
          value={recordState.homeYellow}
          onChangeText={handleHomeYellowChange}
        />
        <Text style={[styles.containerTitle, styles.margin]}>
          Gostujuće opomene
        </Text>
        <TextInput
          style={[styles.bodyForm, styles.bigForm]}
          placeholder="Gostujuće opomene"
          maxLength={500}
          multiline={true}
          value={recordState.awayYellow}
          onChangeText={handleAwayYellowChange}
        />
        <Text style={[styles.containerTitle, styles.margin]}>
          Domaća isključenja
        </Text>
        <TextInput
          style={[styles.bodyForm, styles.bigForm, styles.medium]}
          placeholder="Domaća isključenja"
          maxLength={500}
          multiline={true}
          value={recordState.homeRed}
          onChangeText={handleHomeRedChange}
        />
        <Text style={[styles.containerTitle, styles.margin]}>
          Gostujuća isključenja
        </Text>
        <TextInput
          style={[styles.bodyForm, styles.bigForm, styles.medium]}
          placeholder="Gostujuća isključenja"
          maxLength={500}
          multiline={true}
          value={recordState.awayRed}
          onChangeText={handleAwayRedChange}
        />
        <Text style={[styles.containerTitle, styles.margin]}>Primjedbe</Text>
        <TextInput
          style={[styles.bodyForm, styles.bigForm, styles.medium]}
          placeholder="Primjedbe"
          maxLength={500}
          multiline={true}
          value={recordState.remarks}
          onChangeText={handleRemarksChange}
        />
        <Text style={[styles.containerTitle, styles.margin]}>
          Komentar Suca
        </Text>
        <TextInput
          style={[styles.bodyForm, styles.bigForm, styles.medium]}
          placeholder="Komentar suca"
          maxLength={500}
          multiline={true}
          value={recordState.comentReferee}
          onChangeText={handleComentRefereeChange}
        />
        <View style={styles.containerForm}>
          <Text style={styles.containerTitle}> Rezultat (Domaći:Gosti) </Text>
          <TextInput
            style={styles.bodyForm}
            placeholder="Rezultat"
            maxLength={10}
            value={recordState.result}
            onChangeText={handleResultChange}
          />
        </View>
        <View>
          <Navigation
            value="Menu"
            colorBg="#66ffff"
            text="Pošalji u bazu podataka"
            size={30}
            {...navigation}
          />
          <Navigation
            value="Camera"
            colorBg="#6666ff"
            text="Ipak slikaj zapisnik"
            size={30}
            {...navigation}
          />
        </View>
      </View>
    </ScrollView>
    /**
     * for navigation menu send to db first then go to menu
     * for navigation Camera send to db firt then go to camera
     */
  );

  function handleRoundChange(text: string) {
    setRecordState(state => ({ ...state, round: text }));
  }

  function handleHomeChange(text: string) {
    setRecordState(state => ({ ...state, homeTeam: text }));
  }

  function handleAwayChange(text: string) {
    setRecordState(state => ({ ...state, awayTeam: text }));
  }

  function handleRefereeChange(text: string) {
    setRecordState(state => ({ ...state, referee: text }));
  }

  function handleFirstAssistantChange(text: string) {
    setRecordState(state => ({ ...state, firstAssistant: text }));
  }

  function handleSecondAssistantChange(text: string) {
    setRecordState(state => ({ ...state, secondAssistant: text }));
  }

  function handleDelegateChange(text: string) {
    setRecordState(state => ({ ...state, delegate: text }));
  }

  function handleHomeRepresentativeChange(text: string) {
    setRecordState(state => ({ ...state, homeRepresentative: text }));
  }

  function handleAwayRepresentativeChange(text: string) {
    setRecordState(state => ({ ...state, awayRepresentative: text }));
  }

  function handleHomeYellowChange(text: string) {
    setRecordState(state => ({ ...state, homeYellow: text }));
  }

  function handleAwayYellowChange(text: string) {
    setRecordState(state => ({ ...state, awayYellow: text }));
  }

  function handleHomeRedChange(text: string) {
    setRecordState(state => ({ ...state, homeRed: text }));
  }

  function handleAwayRedChange(text: string) {
    setRecordState(state => ({ ...state, awayRed: text }));
  }

  function handleRemarksChange(text: string) {
    setRecordState(state => ({ ...state, remarks: text }));
  }

  function handleComentRefereeChange(text: string) {
    setRecordState(state => ({ ...state, comentReferee: text }));
  }

  function handleResultChange(text: string) {
    setRecordState(state => ({ ...state, result: text }));
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
  bodyForm: {
    backgroundColor: '#EAEAEA',
    marginLeft: 10,
    marginRight: 10,
    color: '#888888',
    fontSize: 25,
    textAlign: 'center',
    borderColor: '#D8D8D8',
    borderWidth: 1,
    width: 180
  },
  bigForm: {
    height: 300,
    width: 350,
    textAlignVertical: 'top',
    textAlign: 'left',
    marginBottom: 20
  },
  medium: {
    height: 200
  }
});

export default Record;

import React, { useState } from 'react';
import { Text, View, TextInput, StyleSheet } from 'react-native';
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

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Zapisnik</Text>
        <View style={styles.containerForm}>
          <Text style={styles.containerTitle}> Datum </Text>
          <Form
            handleChangeCallback={handleChange}
            placeholder="Datum"
            value={recordState.date}
            maxLength={15}
          />
        </View>
        <View style={styles.containerForm}>
          <Text style={styles.containerTitle}> Liga </Text>
          <Form
            handleChangeCallback={handleChange}
            placeholder="Liga"
            value={recordState.league}
            maxLength={30}
          />
        </View>
        <View style={styles.containerForm}>
          <Text style={styles.containerTitle}> Kolo </Text>
          <Form
            handleChangeCallback={handleChange}
            placeholder="Kolo"
            value={recordState.round}
            maxLength={3}
          />
        </View>
        <Text style={[styles.containerTitle, styles.margin]}>
          Utakmica između klubova
        </Text>
        <View style={styles.containerForm}>
          <Form
            handleChangeCallback={handleChange}
            placeholder="Domaćin"
            value={recordState.homeTeam}
            maxLength={30}
          />
          <Form
            handleChangeCallback={handleChange}
            placeholder="Gost"
            value={recordState.awayTeam}
            maxLength={30}
          />
        </View>
        <View style={styles.containerForm}>
          <Text style={styles.containerTitle}> Sudac </Text>
          <Form
            handleChangeCallback={handleChange}
            placeholder="Sudac"
            value={recordState.referee}
            maxLength={30}
          />
        </View>
        <View style={styles.containerForm}>
          <Text style={styles.containerTitle}> 1. Pomoćni </Text>
          <Form
            handleChangeCallback={handleChange}
            placeholder="1. Pomoćni"
            value={recordState.firstAssistant}
            maxLength={30}
          />
        </View>
        <View style={styles.containerForm}>
          <Text style={styles.containerTitle}> 2. Pomoćni </Text>
          <Form
            handleChangeCallback={handleChange}
            placeholder="2. Pomoćni"
            value={recordState.secondAssistant}
            maxLength={30}
          />
        </View>
        <View style={styles.containerForm}>
          <Text style={styles.containerTitle}> Delegat </Text>
          <Form
            handleChangeCallback={handleChange}
            placeholder="Delegat"
            value={recordState.delegate}
            maxLength={30}
          />
        </View>
        <View style={styles.containerForm}>
          <Text style={styles.containerTitle}> Domaći predstavnik kluba </Text>
          <Form
            handleChangeCallback={handleChange}
            placeholder="Predstavnik"
            value={recordState.homeRepresentative}
            maxLength={30}
          />
        </View>
        <View style={styles.containerForm}>
          <Text style={styles.containerTitle}> Gost predstavnik </Text>
          <Form
            handleChangeCallback={handleChange}
            placeholder="Predstavnik"
            value={recordState.awayRepresentative}
            maxLength={30}
          />
        </View>
        <Text style={[styles.containerTitle, styles.margin]}>
          Domaće opomene
        </Text>
        <Form
          handleChangeCallback={handleChange}
          placeholder="Domaće opomene"
          value={recordState.homeYellow}
          maxLength={500}
          big={true}
        />
        <Text style={[styles.containerTitle, styles.margin]}>
          Gostujuće opomene
        </Text>
        <Form
          handleChangeCallback={handleChange}
          placeholder="Gostujuće opomene"
          value={recordState.awayYellow}
          maxLength={500}
          big={true}
        />
        <Text style={[styles.containerTitle, styles.margin]}>
          Domaća isključenja
        </Text>
        <Form
          handleChangeCallback={handleChange}
          placeholder="Domaća isključenja"
          value={recordState.homeRed}
          maxLength={500}
          medium={true}
        />
        <Text style={[styles.containerTitle, styles.margin]}>
          Gostujuća isključenja
        </Text>
        <Form
          handleChangeCallback={handleChange}
          placeholder="Gostujuća isključenja"
          value={recordState.awayRed}
          maxLength={500}
          medium={true}
        />
        <Text style={[styles.containerTitle, styles.margin]}>Primjedbe</Text>
        <Form
          handleChangeCallback={handleChange}
          placeholder="Primjedbe"
          value={recordState.remarks}
          maxLength={500}
          medium={true}
        />
        <Text style={[styles.containerTitle, styles.margin]}>
          Komentar Suca
        </Text>
        <Form
          handleChangeCallback={handleChange}
          placeholder="Komentar suca"
          value={recordState.comentReferee}
          maxLength={500}
          medium={true}
        />
        <View style={styles.containerForm}>
          <Text style={styles.containerTitle}> Rezultat (Domaći:Gosti) </Text>
          <Form
            handleChangeCallback={handleChange}
            placeholder="Rezultat"
            value={recordState.result}
            maxLength={10}
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
  function handleChange(event) {
    const change = event.nativeEvent.text;
    console.log(event.nativeEvent);
    /**
     * Instead of switch I could use smtg like this [name] : change
     * but don't know how to send 2 arguments(name)
     */
    switch (event.nativeEvent.target) {
      case 13:
        setRecordState(state => ({ ...state, date: change }));
        break;
      case 23:
        setRecordState(state => ({ ...state, league: change }));
        break;
      case 33:
        setRecordState(state => ({ ...state, round: change }));
        break;
      case 43:
        setRecordState(state => ({ ...state, homeTeam: change }));
        break;
      case 45:
        setRecordState(state => ({ ...state, awayTeam: change }));
        break;
      case 55:
        setRecordState(state => ({ ...state, referee: change }));
        break;
      case 65:
        setRecordState(state => ({ ...state, firstAssistant: change }));
        break;
      case 75:
        setRecordState(state => ({ ...state, secondAssistant: change }));
        break;
      case 85:
        setRecordState(state => ({ ...state, delegate: change }));
        break;
      case 95:
        setRecordState(state => ({ ...state, homeRepresentative: change }));
        break;
      case 105:
        setRecordState(state => ({ ...state, awayRepresentative: change }));
        break;
      case 115:
        setRecordState(state => ({ ...state, homeYellow: change }));
        break;
      case 123:
        setRecordState(state => ({ ...state, awayYellow: change }));
        break;
      case 129:
        setRecordState(state => ({ ...state, homeRed: change }));
        break;
      case 137:
        setRecordState(state => ({ ...state, awayRed: change }));
        break;
      case 145:
        setRecordState(state => ({ ...state, remarks: change }));
        break;
      case 153:
        setRecordState(state => ({ ...state, comentReferee: change }));
        break;
      case 153:
        setRecordState(state => ({ ...state, comentReferee: change }));
        break;
      case 159:
        setRecordState(state => ({ ...state, result: change }));
        break;
      default:
        return '';
    }
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
  }
});

export default Record;

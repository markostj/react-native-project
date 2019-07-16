import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableHighlight
} from 'react-native';
import { NavigationScreenProps, ScrollView } from 'react-navigation';

type Props = NavigationScreenProps;

const Record: React.FC<Props> = ({ navigation }) => {
  const [state, setState] = useState({
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

  console.log(state);

  function navigateToPicture() {
    navigation.navigate('Camera');
  }

  function navigateToMenu() {
    navigation.navigate('Menu');
  }

  function handleNameChange(text: string) {
    setState(state => ({ ...state, date: text }));
  }

  function handleLeagueChange(text: string) {
    setState(state => ({ ...state, league: text }));
  }

  function handleRoundChange(text: string) {
    setState(state => ({ ...state, round: text }));
  }

  function handleHomeChange(text: string) {
    setState(state => ({ ...state, homeTeam: text }));
  }

  function handleAwayChange(text: string) {
    setState(state => ({ ...state, awayTeam: text }));
  }

  function handleRefereeChange(text: string) {
    setState(state => ({ ...state, referee: text }));
  }

  function handleFirstAssistantChange(text: string) {
    setState(state => ({ ...state, firstAssistant: text }));
  }

  function handleSecondAssistantChange(text: string) {
    setState(state => ({ ...state, secondAssistant: text }));
  }

  function handleDelegateChange(text: string) {
    setState(state => ({ ...state, delegate: text }));
  }

  function handleHomeRepresentativeChange(text: string) {
    setState(state => ({ ...state, homeRepresentative: text }));
  }

  function handleAwayRepresentativeChange(text: string) {
    setState(state => ({ ...state, awayRepresentative: text }));
  }

  function handleHomeYellowChange(text: string) {
    setState(state => ({ ...state, homeYellow: text }));
  }

  function handleAwayYellowChange(text: string) {
    setState(state => ({ ...state, awayYellow: text }));
  }

  function handleHomeRedChange(text: string) {
    setState(state => ({ ...state, homeRed: text }));
  }

  function handleAwayRedChange(text: string) {
    setState(state => ({ ...state, awayRed: text }));
  }

  function handleRemarksChange(text: string) {
    setState(state => ({ ...state, remarks: text }));
  }

  function handleComentRefereeChange(text: string) {
    setState(state => ({ ...state, comentReferee: text }));
  }

  function handleResultChange(text: string) {
    setState(state => ({ ...state, result: text }));
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Zapisnik</Text>
        <View style={styles.containerForm}>
          <Text style={styles.containerTitle}> Datum </Text>
          <TextInput
            style={styles.bodyForm}
            placeholder="Datum"
            maxLength={15}
            value={state.date}
            onChangeText={handleNameChange}
          />
        </View>
        <View style={styles.containerForm}>
          <Text style={styles.containerTitle}> Liga </Text>
          <TextInput
            style={styles.bodyForm}
            placeholder="Liga"
            maxLength={30}
            value={state.league}
            onChangeText={handleLeagueChange}
          />
        </View>
        <View style={styles.containerForm}>
          <Text style={styles.containerTitle}> Kolo </Text>
          <TextInput
            style={styles.bodyForm}
            placeholder="Kolo"
            maxLength={3}
            value={state.round}
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
            value={state.homeTeam}
            onChangeText={handleHomeChange}
          />
          <TextInput
            style={styles.bodyForm}
            placeholder="Gost"
            maxLength={30}
            value={state.awayTeam}
            onChangeText={handleAwayChange}
          />
        </View>
        <View style={styles.containerForm}>
          <Text style={styles.containerTitle}> Sudac </Text>
          <TextInput
            style={styles.bodyForm}
            placeholder="Sudac"
            maxLength={30}
            value={state.referee}
            onChangeText={handleRefereeChange}
          />
        </View>
        <View style={styles.containerForm}>
          <Text style={styles.containerTitle}> 1. Pomoćni </Text>
          <TextInput
            style={styles.bodyForm}
            placeholder="1. Pomoćni"
            maxLength={30}
            value={state.firstAssistant}
            onChangeText={handleFirstAssistantChange}
          />
        </View>
        <View style={styles.containerForm}>
          <Text style={styles.containerTitle}> 2. Pomoćni </Text>
          <TextInput
            style={styles.bodyForm}
            placeholder="2. Pomoćni"
            maxLength={30}
            value={state.secondAssistant}
            onChangeText={handleSecondAssistantChange}
          />
        </View>
        <View style={styles.containerForm}>
          <Text style={styles.containerTitle}> Delegat </Text>
          <TextInput
            style={styles.bodyForm}
            placeholder="Delegat"
            maxLength={30}
            value={state.delegate}
            onChangeText={handleDelegateChange}
          />
        </View>
        <View style={styles.containerForm}>
          <Text style={styles.containerTitle}> Domaći predstavnik kluba </Text>
          <TextInput
            style={styles.bodyForm}
            placeholder="Predstavnik"
            maxLength={30}
            value={state.homeRepresentative}
            onChangeText={handleHomeRepresentativeChange}
          />
        </View>
        <View style={styles.containerForm}>
          <Text style={styles.containerTitle}> Gost predstavnik </Text>
          <TextInput
            style={styles.bodyForm}
            placeholder="Predstavnik"
            maxLength={30}
            value={state.awayRepresentative}
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
          value={state.homeYellow}
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
          value={state.awayYellow}
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
          value={state.homeRed}
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
          value={state.awayRed}
          onChangeText={handleAwayRedChange}
        />
        <Text style={[styles.containerTitle, styles.margin]}>Primjedbe</Text>
        <TextInput
          style={[styles.bodyForm, styles.bigForm, styles.medium]}
          placeholder="Primjedbe"
          maxLength={500}
          multiline={true}
          value={state.remarks}
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
          value={state.comentReferee}
          onChangeText={handleComentRefereeChange}
        />
        <View style={styles.containerForm}>
          <Text style={styles.containerTitle}> Rezultat (Domaći:Gosti) </Text>
          <TextInput
            style={styles.bodyForm}
            placeholder="Rezultat"
            maxLength={10}
            value={state.result}
            onChangeText={handleResultChange}
          />
        </View>
        <View>
          <TouchableHighlight
            onPress={navigateToMenu} // and send to database
            style={[styles.menuBtn, styles.blue]}
            underlayColor={'#8F8F8F'}
          >
            <Text style={styles.menuBtnText}>Pošalji u bazu podataka</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={navigateToPicture} // and also send to database
            style={[styles.menuBtn, styles.green]}
            underlayColor={'#8F8F8F'}
          >
            <Text style={styles.menuBtnText}>Ipak slikaj zapisnik</Text>
          </TouchableHighlight>
        </View>
      </View>
    </ScrollView>
  );
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
  },
  menuBtn: {
    borderWidth: 1,
    borderColor: 'black',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30,
    marginBottom: 20,
    padding: 20
  },
  menuBtnText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 30
  },
  blue: {
    backgroundColor: '#66ffff'
  },
  green: {
    backgroundColor: '#6666ff'
  }
});

export default Record;

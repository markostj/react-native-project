import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { NavigationScreenProps, ScrollView } from 'react-navigation';

import { Navigation } from '../components/Navigation';
import { FormInput } from '../components/FormInput';
import { Record } from '../models/Record';

type Props = NavigationScreenProps;

const RecordView: React.FC<Props> = ({ navigation }) => {
  const [recordState, setRecordState] = useState(new Record());

  console.log(recordState);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Zapisnik</Text>
        <View style={styles.containerForm}>
          <Text style={styles.containerTitle}> Datum </Text>
          <FormInput
            handleChangeCallback={handleChange}
            placeholder="Datum"
            value={recordState.date}
            size="small"
            propName="date"
            maxLength={15}
          />
        </View>
        <View style={styles.containerForm}>
          <Text style={styles.containerTitle}> Liga </Text>
          <FormInput
            handleChangeCallback={handleChange}
            placeholder="Liga"
            value={recordState.league}
            size="small"
            propName="league"
            maxLength={30}
          />
        </View>
        <View style={styles.containerForm}>
          <Text style={styles.containerTitle}> Kolo </Text>
          <FormInput
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
            handleChangeCallback={handleChange}
            placeholder="Domaćin"
            value={recordState.homeTeam}
            propName="homeTeam"
            size="small"
            maxLength={30}
          />
          <FormInput
            handleChangeCallback={handleChange}
            placeholder="Gost"
            value={recordState.awayTeam}
            propName="awayTeam"
            size="small"
            maxLength={30}
          />
        </View>
        <View style={styles.containerForm}>
          <Text style={styles.containerTitle}> Sudac </Text>
          <FormInput
            handleChangeCallback={handleChange}
            placeholder="Sudac"
            value={recordState.referee}
            propName="referee"
            size="small"
            maxLength={30}
          />
        </View>
        <View style={styles.containerForm}>
          <Text style={styles.containerTitle}> 1. Pomoćni </Text>
          <FormInput
            handleChangeCallback={handleChange}
            placeholder="1. Pomoćni"
            value={recordState.firstAssistant}
            propName="firstAssistant"
            size="small"
            maxLength={30}
          />
        </View>
        <View style={styles.containerForm}>
          <Text style={styles.containerTitle}> 2. Pomoćni </Text>
          <FormInput
            handleChangeCallback={handleChange}
            placeholder="2. Pomoćni"
            value={recordState.secondAssistant}
            propName="secondAssistant"
            size="small"
            maxLength={30}
          />
        </View>
        <View style={styles.containerForm}>
          <Text style={styles.containerTitle}> Delegat </Text>
          <FormInput
            handleChangeCallback={handleChange}
            placeholder="Delegat"
            value={recordState.delegate}
            propName="delegate"
            size="small"
            maxLength={30}
          />
        </View>
        <View style={styles.containerForm}>
          <Text style={styles.containerTitle}> Domaći predstavnik kluba </Text>
          <FormInput
            handleChangeCallback={handleChange}
            placeholder="Predstavnik"
            value={recordState.homeRepresentative}
            propName="homeRepresentative"
            size="small"
            maxLength={30}
          />
        </View>
        <View style={styles.containerForm}>
          <Text style={styles.containerTitle}> Gost predstavnik </Text>
          <FormInput
            handleChangeCallback={handleChange}
            placeholder="Predstavnik"
            value={recordState.awayRepresentative}
            propName="awayRepresentative"
            size="small"
            maxLength={30}
          />
        </View>
        <Text style={[styles.containerTitle, styles.margin]}>
          Domaće opomene
        </Text>
        <FormInput
          handleChangeCallback={handleChange}
          placeholder="Domaće opomene"
          value={recordState.homeYellow}
          propName="homeYellow"
          size="big"
          maxLength={500}
        />
        <Text style={[styles.containerTitle, styles.margin]}>
          Gostujuće opomene
        </Text>
        <FormInput
          handleChangeCallback={handleChange}
          placeholder="Gostujuće opomene"
          value={recordState.awayYellow}
          propName="awayYellow"
          size="big"
          maxLength={500}
        />
        <Text style={[styles.containerTitle, styles.margin]}>
          Domaća isključenja
        </Text>
        <FormInput
          handleChangeCallback={handleChange}
          placeholder="Domaća isključenja"
          value={recordState.homeRed}
          propName="homeRed"
          size="medium"
          maxLength={500}
        />
        <Text style={[styles.containerTitle, styles.margin]}>
          Gostujuća isključenja
        </Text>
        <FormInput
          handleChangeCallback={handleChange}
          placeholder="Gostujuća isključenja"
          value={recordState.awayRed}
          propName="awayRed"
          size="medium"
          maxLength={500}
        />
        <Text style={[styles.containerTitle, styles.margin]}>Primjedbe</Text>
        <FormInput
          handleChangeCallback={handleChange}
          placeholder="Primjedbe"
          value={recordState.remarks}
          propName="remarks"
          size="medium"
          maxLength={500}
        />
        <Text style={[styles.containerTitle, styles.margin]}>
          Komentar Suca
        </Text>
        <FormInput
          handleChangeCallback={handleChange}
          placeholder="Komentar suca"
          value={recordState.comentReferee}
          propName="comentReferee"
          size="medium"
          maxLength={500}
        />
        <View style={styles.containerForm}>
          <Text style={styles.containerTitle}> Rezultat (Domaći:Gosti) </Text>
          <FormInput
            handleChangeCallback={handleChange}
            placeholder="Rezultat"
            value={recordState.result}
            propName="result"
            size="small"
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
  function handleChange(propName: string, value: string) {
    setRecordState({ ...recordState, [propName]: value });
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

export default RecordView;

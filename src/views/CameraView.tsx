import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image
} from 'react-native';
import { NavigationScreenProps } from 'react-navigation';

import { Navigation } from '../components/Navigation';
import ImagePicker from 'react-native-image-picker';
import { FirebaseAuth } from '../firebase/FirebaseService';
import * as firebase from 'firebase';

type Props = NavigationScreenProps;

const CameraView: React.FC<Props> = ({ navigation }) => {
  const [photo, setPhoto] = useState();

  const handleUpload = async () => {
    const response = await fetch(photo.uri);
    const blob = await response.blob();
    const user = FirebaseAuth.currentUser;
    /**
     * find how to upload with random name
     */
    const ref = firebase
      .storage()
      .ref()
      .child('Records/' + 'bla');
    return ref.put(blob);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {photo && (
          <Image
            source={{ uri: photo.uri }}
            style={{ width: 300, height: 300 }}
          />
        )}
        <TouchableHighlight
          onPress={handleTakePicture}
          style={styles.btn}
          underlayColor={'#8F8F8F'}
        >
          <Text style={styles.btnText}>Uslikaj</Text>
        </TouchableHighlight>
      </View>
      <View>
        <TouchableHighlight
          onPress={handleUpload}
          style={styles.btn}
          underlayColor={'#8F8F8F'}
        >
          <Text style={styles.btnText}>UPLOAD</Text>
        </TouchableHighlight>
        {/*     <Navigation
          value="Menu"
          colorBg="#66ffff"
          text="Pošalji u bazu podataka"
          size={30}
          {...navigation}
        /> */}
      </View>
    </SafeAreaView>
  );

  function handleTakePicture() {
    const options = {
      noData: true
    };
    ImagePicker.launchCamera(options, response => {
      console.log('response:', response);
      if (response.uri) {
        setPhoto(response);
      }
    });
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btn: {
    marginTop: 20,
    width: 100,
    backgroundColor: '#1B85F6'
  },
  btnText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#fff'
  }
});

export default CameraView;

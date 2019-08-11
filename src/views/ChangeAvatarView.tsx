import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Alert, Button, Image } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { TextInput, TouchableHighlight } from 'react-native-gesture-handler';
import { FirebaseAuth } from '../firebase/FirebaseService';
import { connect } from 'react-redux';
import { passwordReset } from '../redux/userThunks';
import { ApplicationState } from '../redux/store';
import ImagePicker from 'react-native-image-picker';

type Props = NavigationScreenProps & DispatchProps & ReduxProps;

interface ReduxProps {
  error: string;
  reset: boolean;
}

interface DispatchProps {
  passwordReset: (email: string) => void;
}

const ChangeAvatarView: React.FC<Props> = ({
  navigation,
  error,
  reset,
  passwordReset
}) => {
  const [photo, setPhoto] = useState();

  console.log(photo);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Izaberite svoju profilnu sliku</Text>
      {photo && (
        <Image
          source={{ uri: photo.uri }}
          style={{ width: 300, height: 300 }}
        />
      )}
      <TouchableHighlight
        onPress={handleChoosePhoto}
        style={styles.btn}
        underlayColor={'#8F8F8F'}
      >
        <Text style={styles.btnText}>Odaberi sliku</Text>
      </TouchableHighlight>
      <TouchableHighlight
        onPress={handleUpload}
        style={styles.btn}
        underlayColor={'#8F8F8F'}
      >
        <Text style={styles.btnText}>UPLOAD</Text>
      </TouchableHighlight>
    </View>
  );

  function handleChoosePhoto() {
    const options = {
      noData: true
    };
    ImagePicker.launchImageLibrary(options, response => {
      console.log('response:', response);
      if (response.uri) {
        setPhoto(response);
      }
    });
  }

  function handleUpload() {
    console.log('upload');
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 25
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

export default connect<ReduxProps, DispatchProps, null, ApplicationState>(
  state => ({
    error: state.user.error,
    reset: state.user.resetPassword
  }),
  {
    passwordReset
  }
)(ChangeAvatarView);

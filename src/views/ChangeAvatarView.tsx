import React, { useState } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { passwordReset } from '../redux/users/userThunks';
import { ApplicationState } from '../redux/store';
import ImagePicker from 'react-native-image-picker';
import { uploadAvatar } from '../redux/users/userThunks';
import { logOut } from '../redux/users/userThunks';

type Props = NavigationScreenProps & DispatchProps & ReduxProps;

interface ReduxProps {
  error: string;
  reset: boolean;
  photoURI: string;
}

interface DispatchProps {
  passwordReset: (email: string) => void;
  logOut: () => void;
  uploadAvatar: (uri: string) => void;
}

const ChangeAvatarView: React.FC<Props> = ({ uploadAvatar, photoURI }) => {
  const [photo, setPhoto] = useState();

  if (!photo) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Trenutna profilna slika</Text>
        <Image source={{ uri: photoURI }} style={styles.pic} />
        <View style={styles.buttons}>
          <TouchableHighlight
            onPress={handleChoosePhoto}
            style={[styles.btn, styles.blueBtn]}
            underlayColor={'#0000ff'}
          >
            <Text style={[styles.btnText, styles.whiteTxt]}>
              Odaberite sliku
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={handleUpload}
            style={[styles.btn, styles.whiteBtn]}
            underlayColor={'#ffffff'}
          >
            <Text style={[styles.btnText, styles.blueTxt]}>
              Promijeni profilnu
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: photo }} style={styles.pic} />
      <View style={styles.buttons}>
        <TouchableHighlight
          onPress={handleChoosePhoto}
          style={[styles.btn, styles.blueBtn]}
          underlayColor={'#0000ff'}
        >
          <Text style={[styles.btnText, styles.whiteTxt]}>Odaberite sliku</Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={handleUpload}
          style={[styles.btn, styles.whiteBtn]}
          underlayColor={'#ffffff'}
        >
          <Text style={[styles.btnText, styles.blueTxt]}>
            Promijeni profilnu
          </Text>
        </TouchableHighlight>
      </View>
    </View>
  );

  function handleChoosePhoto() {
    const options = {
      noData: true
    };
    ImagePicker.launchImageLibrary(options, response => {
      console.log('response:', response);
      if (response.uri) {
        setPhoto(response.uri);
      }
    });
  }

  function handleUpload() {
    uploadAvatar(photo);
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
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'black',
    marginTop: 30,
    marginBottom: 20,
    marginLeft: 10,
    padding: 10,
    borderRadius: 20,
    width: 150,
    height: 50
  },
  blueBtn: {
    backgroundColor: '#0000ff'
  },
  whiteBtn: {
    backgroundColor: '#ffffff'
  },
  blueTxt: {
    color: '#0000ff'
  },
  whiteTxt: {
    color: '#ffffff'
  },
  btnText: {
    textAlign: 'center',
    fontSize: 14
  },
  pic: {
    width: 300,
    height: 300
  },
  buttons: {
    flexDirection: 'row'
  }
});

export default connect<ReduxProps, DispatchProps, null, ApplicationState>(
  state => ({
    error: state.user.error,
    reset: state.user.resetPassword,
    photoURI: state.user.photoURL
  }),
  {
    passwordReset,
    logOut,
    uploadAvatar
  }
)(ChangeAvatarView);

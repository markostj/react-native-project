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
        <TouchableHighlight
          onPress={handleChoosePhoto}
          style={styles.btn}
          underlayColor={'#8F8F8F'}
        >
          <Text style={styles.btnText}>Odaberite sliku</Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={handleUpload}
          style={styles.btn}
          underlayColor={'#8F8F8F'}
        >
          <Text style={styles.btnText}>Promijeni profilnu</Text>
        </TouchableHighlight>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: photo }} style={styles.pic} />
      <TouchableHighlight
        onPress={handleChoosePhoto}
        style={styles.btn}
        underlayColor={'#8F8F8F'}
      >
        <Text style={styles.btnText}>Odaberite sliku</Text>
      </TouchableHighlight>
      <TouchableHighlight
        onPress={handleUpload}
        style={styles.btn}
        underlayColor={'#8F8F8F'}
      >
        <Text style={styles.btnText}>Promijeni profilnu</Text>
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
    borderWidth: 1,
    borderColor: 'black',
    marginTop: 10,
    marginBottom: 15,
    padding: 10,
    width: 200,
    backgroundColor: '#00ffff'
  },
  btnText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff'
  },
  pic: {
    width: 300,
    height: 300
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

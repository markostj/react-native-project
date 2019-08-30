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
import { connect } from 'react-redux';
import { ApplicationState } from '../redux/store';
import ImagePicker from 'react-native-image-picker';
import { uploadRecord } from '../redux/users/userThunks';

type Props = NavigationScreenProps & DispatchProps;

interface DispatchProps {
  uploadRecord: (photoUri: string) => void;
}

const CameraView: React.FC<Props> = ({ uploadRecord }) => {
  const [photo, setPhoto] = useState();
  return (
    <View style={styles.container}>
      {photo && <Image source={{ uri: photo }} style={styles.pic} />}
      <View style={styles.buttons}>
        <TouchableHighlight
          onPress={handleTakePicture}
          style={[styles.btn, styles.blueBtn]}
          underlayColor={'#0000ff'}
        >
          <Text style={[styles.btnText, styles.whiteTxt]}>Uslikaj</Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={handleUpload}
          style={[styles.btn, styles.whiteBtn]}
          underlayColor={'#ffffff'}
        >
          <Text style={[styles.btnText, styles.blueTxt]}>UPLOAD</Text>
        </TouchableHighlight>
      </View>
    </View>
  );

  function handleTakePicture() {
    const options = {
      noData: true
    };
    ImagePicker.launchCamera(options, response => {
      if (response.uri) {
        setPhoto(response.uri);
      }
    });
  }

  function handleUpload() {
    uploadRecord(photo);
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
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'black',
    marginTop: 30,
    marginBottom: 20,
    marginLeft: 10,
    padding: 10,
    borderRadius: 10,
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

export default connect<null, DispatchProps, null, ApplicationState>(
  () => ({}),
  {
    uploadRecord
  }
)(CameraView);

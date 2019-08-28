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
      <TouchableHighlight
        onPress={handleTakePicture}
        style={styles.btn}
        underlayColor={'#8F8F8F'}
      >
        <Text style={styles.btnText}>Uslikaj</Text>
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
    borderWidth: 1,
    borderColor: 'black',
    marginTop: 10,
    marginBottom: 15,
    padding: 10,
    width: 200,
    backgroundColor: '#EE82EE'
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

export default connect<null, DispatchProps, null, ApplicationState>(
  () => ({}),
  {
    uploadRecord
  }
)(CameraView);

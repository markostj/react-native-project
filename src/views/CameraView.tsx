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
  console.log(photo);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {photo && (
          <Image source={{ uri: photo }} style={{ width: 300, height: 300 }} />
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

export default connect<null, DispatchProps, null, ApplicationState>(
  () => ({}),
  {
    uploadRecord
  }
)(CameraView);

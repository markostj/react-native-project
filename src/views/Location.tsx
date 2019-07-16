import React, { useEffect, useState } from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { connect } from 'react-redux';

import { GetUserActions } from '../redux/userActions';
import { ApplicationState } from 'redux/store';

type Props = NavigationScreenProps & ReduxProps & DispatchProps;

interface ReduxProps {
  userName: string;
  userCenter: string;
}

interface DispatchProps {
  getName: (text: string) => void;
  getCenter: (text: string) => void;
}

const Location: React.FC<Props> = ({
  navigation,
  userName,
  userCenter,
  getName,
  getCenter
}) => {
  console.log(userName, userCenter);

  const [location, setLocation] = useState('Osijek');

  /**
   * Look how to use useEffect
   */
  useEffect(() => {
    // Excercise probably make something with firebase and then fetch it
    fetch('https://jsonplaceholder.typicode.com/users/1')
      .then(response => response.json())
      .then(json => {
        getName(json.name);
        getCenter(json.address.city);
      });
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image // Put real picture from firebase storage
          style={styles.headerImg}
          source={require('C:/Users/marko/OneDrive/Desktop/Projekt/src/img/man.jpeg')}
        />
        <Text style={styles.headerName}>{userName}</Text>
        <Text style={styles.headerCenter}> {userCenter}</Text>
      </View>
      <Image // Put real location and save it to location
        style={styles.bodyImg}
        source={require('C:/Users/marko/OneDrive/Desktop/Projekt/src/img/location.png')}
      />
      <View>
        <TouchableHighlight
          onPress={handlePress}
          style={styles.footerBtn}
          underlayColor={'#8F8F8F'}
        >
          <Text style={styles.footerBtnText}>Odaberi vrstu zapisnika</Text>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );

  function handlePress() {
    navigation.navigate('Menu');
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
  headerImg: {
    width: 100,
    height: 100,
    borderRadius: 50
  },
  headerName: {
    marginTop: 10,
    fontSize: 20
  },
  headerCenter: {
    fontSize: 15
  },
  bodyImg: {
    width: 350,
    height: 300,
    marginBottom: 20
  },
  footerBtn: {
    borderWidth: 1,
    borderColor: 'black',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
    padding: 5,
    backgroundColor: '#f4511e'
  },
  footerBtnText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 30
  }
});

export default connect<ReduxProps, DispatchProps, null, ApplicationState>(
  state => ({
    userName: state.user.name,
    userCenter: state.user.center
  }),
  {
    getName: GetUserActions.setName,
    getCenter: GetUserActions.setCenter
  }
)(Location);

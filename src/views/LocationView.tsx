import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { connect } from 'react-redux';

import { ApplicationState } from '../redux/store';

import { Navigation } from '../components/Navigation';

import { itemsFetchData } from '../redux/userActions';

type Props = NavigationScreenProps & ReduxProps & DispatchProps;

interface ReduxProps {
  userName: string;
  userCenter: string;
}

interface DispatchProps {
  fetchData: (url: string) => void;
}

const LocationView: React.FC<Props> = ({
  navigation,
  userName,
  userCenter,
  fetchData
}) => {
  console.log(userName, userCenter);
  console.log(navigation.navigate);

  const [location, setLocation] = useState('Osijek');
  /**
   * location from geolocation
   */

  /* useEffect(() => {
    // Excercise probably make something with firebase and then fetch it
    fetchData('https://jsonplaceholder.typicode.com/users/2');
  }, []); 
    See if we need this?
  */

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image // Put real picture from firebase storage
          style={styles.headerImg}
          source={{
            uri:
              'https://firebasestorage.googleapis.com/v0/b/ns-zapisnik.appspot.com/o/22.jpg?alt=media&token=f2932fb7-c5e5-4e5c-beed-5a38e9cb5077'
          }}
        />
        <Text style={styles.headerName}>{userName}</Text>
        {/*         <Text style={styles.headerCenter}> {userCenter}</Text> */}
      </View>
      <Image // Put real location and save it to location
        style={styles.bodyImg}
        source={require('C:/Users/marko/OneDrive/Desktop/Projekt/src/img/location.png')}
      />
      <View>
        <Navigation
          value="Menu"
          colorBg="#f4511e"
          text="Odaberi vrstu zapisnika"
          size={25}
          {...navigation}
        />
      </View>
    </SafeAreaView>
  );
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
  }
});

export default connect<ReduxProps, DispatchProps, null, ApplicationState>(
  state => ({
    userName: state.user.name,
    userCenter: state.user.center
  }),
  {
    fetchData: itemsFetchData
  }
)(LocationView);

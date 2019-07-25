import React from 'react';

import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { NavigationScreenProps } from 'react-navigation';

import { connect } from 'react-redux';
import { ApplicationState } from 'redux/store';

import { Navigation } from '../components/Navigation';

type Props = NavigationScreenProps & ReduxProps;

interface ReduxProps {
  userName: string;
  userCenter: string;
}

const Menu: React.FC<Props> = ({ navigation, userName, userCenter }) => {
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

      <View>
        <Navigation
          value="Camera"
          colorBg="#6666ff"
          text="Slikaj"
          size={30}
          {...navigation}
        />
        <Navigation
          value="Record"
          colorBg="#00cc00"
          text="Napiši zapisnik"
          size={30}
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
    borderRadius: 50,
    justifyContent: 'center'
  },
  headerName: {
    marginTop: 10,
    fontSize: 20
  },
  headerCenter: {
    fontSize: 15
  }
});

export default connect<ReduxProps, null, null, ApplicationState>(state => ({
  userName: state.user.name,
  userCenter: state.user.center
}))(Menu);

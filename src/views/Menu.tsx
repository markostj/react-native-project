import React from 'react';

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
import { ApplicationState } from 'redux/store';

type Props = NavigationScreenProps & ReduxProps;

interface ReduxProps {
  userName: string;
  userCenter: string;
}

const Menu: React.FC<Props> = props => {
  const { navigation, userName, userCenter } = props;

  function navigateToPicture() {
    navigation.navigate('Camera');
  }

  function navigateToWrite() {
    navigation.navigate('Record');
  }

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
        <TouchableHighlight
          onPress={navigateToPicture}
          style={[styles.menuBtn, styles.blue]}
          underlayColor={'#8F8F8F'}
        >
          <Text style={styles.menuBtnText}>Slikaj</Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={navigateToWrite}
          style={[styles.menuBtn, styles.green]}
          underlayColor={'#8F8F8F'}
        >
          <Text style={styles.menuBtnText}>Napiši zapisnik</Text>
        </TouchableHighlight>
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
  },
  menuBtn: {
    borderWidth: 1,
    borderColor: 'black',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30,
    marginBottom: 20,
    padding: 20
  },
  menuBtnText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 30
  },
  blue: {
    backgroundColor: '#6666ff'
  },
  green: {
    backgroundColor: '#00cc00'
  }
});

export default connect<ReduxProps, null, ApplicationState>(state => ({
  userName: state.user.name,
  userCenter: state.user.center
}))(Menu);

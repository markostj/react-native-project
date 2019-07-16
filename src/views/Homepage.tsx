import React, { useEffect, useState } from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';
import { NavigationScreenProps } from 'react-navigation';

type Props = NavigationScreenProps;

export const Homepage: React.FC<Props> = ({ navigation }) => {
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  useEffect(() => {
    console.log('Similar to componentDiDMount and componentDiDUpdate');
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image // maybe delete this and left just navigation
          style={styles.img}
          source={require('C:/Users/marko/OneDrive/Desktop/Projekt/src/img/square.png')}
        />
        <Image
          style={styles.img}
          source={require('C:/Users/marko/OneDrive/Desktop/Projekt/src/img/square.png')}
        />
      </View>
      <View style={styles.body}>
        <Image
          style={styles.bodyImg}
          source={require('C:/Users/marko/OneDrive/Desktop/Projekt/src/img/hns.png')}
        />
        <Text style={styles.bodyTitle}>NS Zapisnik</Text>
        <View style={styles.bodyLogIn}>
          <TextInput
            style={styles.bodyForm}
            placeholder="Full Name"
            maxLength={40}
            value={name}
            onChangeText={handleNameChange}
          />
          <TextInput
            secureTextEntry={true}
            style={styles.bodyPassword}
            placeholder="Password"
            maxLength={20}
            value={password}
            onChangeText={handlePasswordChange}
          />
        </View>

        <TouchableHighlight
          onPress={handleSubmit}
          style={styles.footerBtn}
          underlayColor={'#8F8F8F'}
        >
          <Text style={styles.footerBtnText}>Log In</Text>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );

  function handleNameChange(text: string) {
    setName(text);
    console.log(name);
  }

  function handlePasswordChange(text: string) {
    setPassword(text);
    console.log(password);
  }

  function handleSubmit() {
    console.log(name);
    console.log(password); // Check Authentification here and then --> navigate
    navigation.navigate('Location');
  }
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flex: 1
  },

  header: {
    backgroundColor: '#8F8F8F',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  img: {
    width: 25,
    height: 25,
    marginLeft: 10,
    marginRight: 10
  },
  body: {
    backgroundColor: '#C4C4C4',
    flex: 9,
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  bodyImg: {
    width: 80,
    height: 80,
    overflow: 'visible' // Behave like it is hidden??
  },
  bodyTitle: {
    color: '#9E1700',
    textAlign: 'center',
    fontSize: 40
  },
  bodyLogIn: {},
  bodyForm: {
    backgroundColor: '#fff',
    marginLeft: 10,
    marginRight: 10,
    color: '#000',
    fontSize: 25,
    textAlign: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    width: 300
  },
  bodyPassword: {
    backgroundColor: '#fff',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    color: '#000',
    fontSize: 25,
    textAlign: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    width: 300
  },
  footerBtn: {
    marginLeft: 20,
    marginRight: 20,
    padding: 5,
    backgroundColor: 'transparent'
  },
  footerBtnText: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 30
  }
});

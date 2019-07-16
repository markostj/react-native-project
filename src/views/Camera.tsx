import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import { NavigationScreenProps } from 'react-navigation';

type Props = NavigationScreenProps;

const Camera: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text> Camera</Text>
      </View>
      <View>
        <TouchableHighlight
          onPress={handlePress}
          style={styles.footerBtn}
          underlayColor={'#8F8F8F'}
        >
          <Text style={styles.footerBtnText}>Pošalji u bazu podataka</Text>
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
  footerBtn: {
    borderWidth: 1,
    borderColor: 'black',
    height: 70,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#66ffff'
  },
  footerBtnText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 30
  }
});

export default Camera;

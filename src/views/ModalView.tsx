import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { NavigationScreenProps } from 'react-navigation';
import { Navigation } from '../components/Navigation';

type Props = NavigationScreenProps;

const ModalView: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.modalText}>
        Vaš zapisnik je uspješno poslan u bazu!
      </Text>
      <Navigation
        value="Homepage"
        colorBg="#f4511e"
        text="OK, go to Menu"
        size={30}
        {...navigation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalText: {
    fontSize: 30,
    textAlign: 'center'
  }
});

export default ModalView;

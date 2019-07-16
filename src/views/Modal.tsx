import React from 'react';
import { Button, Text, View } from 'react-native';

import { NavigationScreenProps } from 'react-navigation';

type Props = NavigationScreenProps;

const Modal: React.FC<Props> = ({ navigation }) => {
  function handleOnPress() {
    navigation.goBack();
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 30 }}>This is a modal!</Text>
      <Button onPress={handleOnPress} title="Dismiss" />
    </View>
  );
};

export default Modal;

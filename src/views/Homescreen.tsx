import React from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';

type Props = NavigationScreenProps;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button title="Go to details" onPress={handleOnPressDetails} />
      <View style={{ marginTop: 20 }}>
        <Button title="Go to Hns Log Inn" onPress={handleOnPressLogin} />
      </View>
      <View style={{ marginTop: 20 }}>
        <Button // If the Uploading to Firebase is completed successfully put Modal like It is uploaded
          onPress={handleOnPressModal}
          title="Modal"
          color="grey"
        />
      </View>
    </View>
  );

  function handleOnPressDetails() {
    navigation.navigate('Details');
  }

  function handleOnPressLogin() {
    navigation.navigate('App');
  }

  function handleOnPressModal() {
    navigation.navigate('MyModal');
  }
};

export default HomeScreen;

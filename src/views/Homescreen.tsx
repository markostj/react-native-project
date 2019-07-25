import React from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';

import { Navigation } from '../components/Navigation';

type Props = NavigationScreenProps;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  console.log(navigation);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Navigation
        value="Details"
        colorBg="red"
        text="Details"
        size={30}
        {...navigation}
      />
      <Navigation
        value="App"
        colorBg="yellow"
        text="Go to Hns Login"
        size={30}
        {...navigation}
      />
      <Navigation
        value="MyModal"
        colorBg="grey"
        text="Modal"
        size={30}
        {...navigation}
      />
    </View>
  );
};

export default HomeScreen;

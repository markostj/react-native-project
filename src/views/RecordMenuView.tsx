import React from 'react';

import { SafeAreaView, StyleSheet, View } from 'react-native';

import { NavigationScreenProps } from 'react-navigation';

import { Navigation } from '../components/Navigation';

type Props = NavigationScreenProps;

// Maybe it looks empty? Put stmg here?

const RecordMenuView: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Navigation
          value="Camera"
          colorBg="#EE82EE"
          text="Slikaj"
          size={30}
          {...navigation}
        />
        <Navigation
          value="Record"
          colorBg="#800080"
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
  }
});

export default RecordMenuView;

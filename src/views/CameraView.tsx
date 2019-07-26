import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';

import { Navigation } from '../components/Navigation';

type Props = NavigationScreenProps;

const CameraView: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text> Camera</Text>
      </View>
      <View>
        <Navigation
          value="Menu"
          colorBg="#66ffff"
          text="Pošalji u bazu podataka"
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default CameraView;

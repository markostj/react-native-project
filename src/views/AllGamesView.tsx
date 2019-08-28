import React, { useEffect } from 'react';

import { SafeAreaView, StyleSheet, View, Text, Alert } from 'react-native';

import { NavigationScreenProps } from 'react-navigation';
import { connect } from 'react-redux';

import { getAllGames } from '../redux/records/recordThunks';
import { ApplicationState } from '../redux/store';

import { CirclesLoader, TextLoader } from 'react-native-indicator';

type Props = NavigationScreenProps & ReduxProps & DispatchProps;

interface ReduxProps {
  records: any;
  error: string;
}
interface DispatchProps {
  listGames: () => void;
}

const AllGamesView: React.FC<Props> = ({ listGames, records, error }) => {
  useEffect(() => {
    listGames();
    if (error) {
      Alert.alert(error);
    }
  }, []);

  if (records !== undefined) {
    return (
      <SafeAreaView style={styles.container}>
        <View>
          {records.map(
            (game: {
              id: string | number | undefined;
              date: React.ReactNode;
              homeTeam: React.ReactNode;
              awayTeam: React.ReactNode;
              result: React.ReactNode;
            }) => (
              <Text style={styles.text} key={game.id}>
                {game.date} {game.homeTeam} - {game.awayTeam} ({game.result})
              </Text>
            )
          )}
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <CirclesLoader size={100} />
      <TextLoader style={styles.loadingText} text="Loading" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#808080',
    marginBottom: 5
  },
  loadingText: {
    fontSize: 20,
    textAlign: 'center'
  }
});

export default connect<ReduxProps, DispatchProps, null, ApplicationState>(
  state => ({
    records: state.record.records,
    error: state.record.error
  }),
  {
    listGames: getAllGames
  }
)(AllGamesView);

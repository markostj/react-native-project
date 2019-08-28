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
  userName: string;
}
interface DispatchProps {
  listGames: (name: string) => void;
}

const UserGamesView: React.FC<Props> = ({
  listGames,
  records,
  userName,
  error
}) => {
  useEffect(() => {
    listGames(userName);
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
              referee: string;
              firstAssistant: string;
              secondAssistant: string;
              id: string | number | undefined;
              date: React.ReactNode;
              homeTeam: React.ReactNode;
              awayTeam: React.ReactNode;
              result: React.ReactNode;
            }) => {
              if (
                game.referee === userName ||
                game.firstAssistant === userName ||
                game.secondAssistant === userName
              ) {
                return (
                  <View key={game.id} style={styles.textContainer}>
                    <Text style={styles.text}>
                      {game.date} {game.homeTeam} - {game.awayTeam} (
                      {game.result})
                    </Text>
                    <Text style={styles.text}>
                      {game.referee} {game.firstAssistant}{' '}
                      {game.secondAssistant}
                    </Text>
                  </View>
                );
              }
            }
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
  textContainer: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#808080',
    marginBottom: 8,
    marginLeft: 5,
    marginRight: 5
  },
  text: {
    textAlign: 'center',
    fontSize: 18
  },
  loadingText: {
    fontSize: 20,
    textAlign: 'center'
  }
});

export default connect<ReduxProps, DispatchProps, null, ApplicationState>(
  state => ({
    userName: state.user.displayName,
    records: state.record.records,
    error: state.record.error
  }),
  {
    listGames: getAllGames
  }
)(UserGamesView);

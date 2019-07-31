import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { NavigationScreenProps } from 'react-navigation';
import { ApplicationState } from 'redux/store';
import { TextInput } from 'react-native-gesture-handler';
import { GetUserActions } from '../redux/userActions';
import { itemsFetchData } from '../redux/userActions';
import { FirebaseAuth, FirebaseDatabase } from '../firebase/FirebaseService';

type Props = NavigationScreenProps & ReduxProps & DispatchProps;

interface ReduxProps {
  userName: string;
  userCenter: string;
  loading: boolean;
  error: boolean;
}

interface DispatchProps {
  getName: (text: string) => void;
  fetchData: (url: string) => void;
}

const DetailsView: React.FC<Props> = ({
  userName,
  userCenter,
  getName,
  loading,
  error,
  fetchData
}) => {
  useEffect(() => {
    fetchData('https://jsonplaceholder.typicode.com/users/1');
  }, []);

  /**
   * with [] it doesnt fetch data constantly
   */

  console.log(userName);

  console.log('FirebaseAuth:', FirebaseAuth);
  console.log('FirebaseDatabase:', FirebaseDatabase);

  if (loading && error) {
    return <Text>Ispričavamo se došlo je do pogreške</Text>;
  }
  if (loading) {
    return <Text>Učitava se...</Text>;
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text> {userName}</Text>
      <Text> {userCenter}</Text>
      <TextInput
        style={{ height: 50, width: 100, borderColor: 'gray', borderWidth: 1 }}
        placeholder="Full Name"
        maxLength={40}
        value={userName}
        onChangeText={handleChange}
      />
    </View>
  );

  function handleChange(text: string) {
    getName(text);
  }
};

export default connect<ReduxProps, DispatchProps, null, ApplicationState>(
  state => ({
    userName: state.user.name,
    userCenter: state.user.center,
    loading: state.user.loading,
    error: state.user.error
  }),
  {
    getName: GetUserActions.setName,
    fetchData: itemsFetchData
  }
)(DetailsView);

import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { NavigationScreenProps } from 'react-navigation';
import { ApplicationState } from 'redux/store';
import { TextInput } from 'react-native-gesture-handler';
import { GetUserActions } from '../redux/userActions';

type Props = NavigationScreenProps & ReduxProps & DispatchProps;

interface ReduxProps {
  userName: string;
  userCenter: string;
}

interface DispatchProps {
  getName: (text: string) => void;
}

const DetailsView: React.FC<Props> = ({ userName, userCenter, getName }) => {
  console.log(userName);

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
    userCenter: state.user.center
  }),
  {
    getName: GetUserActions.setName
  }
)(DetailsView);

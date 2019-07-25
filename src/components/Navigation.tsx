import React from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { StyleSheet, Text } from 'react-native';

type Props = NavigationScreenProps;

export const Navigation: React.FC<Props> = props => {
  return (
    <TouchableHighlight
      style={[styles.button, { backgroundColor: props.colorBg }]}
      onPress={whenClicked}
      underlayColor={'#8F8F8F'}
    >
      <Text style={[styles.text, { fontSize: props.size }]}>{props.text}</Text>
    </TouchableHighlight>
  );

  function whenClicked() {
    props.navigate(props.value);
  }
};

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderColor: 'black',
    marginTop: 30,
    marginBottom: 20,
    padding: 20
  },
  text: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold'
  }
});

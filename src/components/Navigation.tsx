import React from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { StyleSheet, Text } from 'react-native';

type Props = NavigationScreenProps & OwnProps;

interface OwnProps {
  colorBg: string;
  size: number;
  text: string;
  value: string;
  navigate: (value: string) => void;
}

export const Navigation: React.FC<Props> = ({
  colorBg,
  size,
  text,
  navigate,
  value
}) => {
  return (
    <TouchableHighlight
      style={[styles.button, { backgroundColor: colorBg }]}
      onPress={whenClicked}
      underlayColor={'#8F8F8F'}
    >
      <Text style={[styles.text, { fontSize: size }]}>{text}</Text>
    </TouchableHighlight>
  );

  function whenClicked() {
    navigate(value);
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

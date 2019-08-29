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
  if (colorBg === '#ffffff') {
    return (
      <TouchableHighlight
        underlayColor={colorBg}
        style={[styles.button, { backgroundColor: colorBg }]}
        onPress={whenClicked}
      >
        <Text style={[styles.white, { fontSize: size }]}>{text}</Text>
      </TouchableHighlight>
    );
  }

  return (
    <TouchableHighlight
      underlayColor={colorBg}
      style={[styles.button, { backgroundColor: colorBg }]}
      onPress={whenClicked}
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
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'black',
    marginTop: 5,
    marginBottom: 10,
    marginLeft: 10,
    padding: 10,
    borderRadius: 20,
    width: 150,
    height: 50
  },
  text: {
    color: '#fff',
    textAlign: 'center'
  },
  white: {
    color: '#0000ff',
    textAlign: 'center'
  }
});

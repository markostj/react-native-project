import React from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { TextInput } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';

type Props = NavigationScreenProps;

export const Form: React.FC<Props> = ({
  placeholder,
  value,
  name,
  onChangeText
}) => {
  return (
    <TextInput
      style={styles.bodyForm}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText(name, value)}
    />
  );
};

const styles = StyleSheet.create({
  bodyForm: {
    backgroundColor: '#EAEAEA',
    marginLeft: 10,
    marginRight: 10,
    color: '#888888',
    fontSize: 25,
    textAlign: 'center',
    borderColor: '#D8D8D8',
    borderWidth: 1,
    width: 180
  }
});

{
  /* <TextInput
      style={styles.bodyForm}
      placeholder={props.placeholder}
      value={props.value}
      name={props.name}
      onChangeText={onChangeText}
    /> */
}

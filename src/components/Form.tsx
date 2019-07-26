import React from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { TextInput } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';

type Props = NavigationScreenProps & OwnProps;

interface OwnProps {
  placeholder: string;
  value: string;
  name: string;
  type: string;
  maxLength: number;
  big: boolean;
  medium: boolean;
  /**
   * e type?
   */
  handleChangeCallback: (e: any) => void;
}

export const Form: React.FC<Props> = ({
  placeholder,
  value,
  handleChangeCallback,
  maxLength,
  big,
  medium
}) => {
  if (medium === true) {
    return (
      <TextInput
        style={[styles.bodyForm, styles.bigForm, styles.mediumForm]}
        placeholder={placeholder}
        value={value}
        onChange={handleChangeCallback}
        maxLength={maxLength}
        multiline={true}
      />
    );
  }
  if (big === true) {
    return (
      <TextInput
        style={[styles.bodyForm, styles.bigForm]}
        placeholder={placeholder}
        value={value}
        onChange={handleChangeCallback}
        maxLength={maxLength}
        multiline={true}
      />
    );
  }
  return (
    <TextInput
      style={styles.bodyForm}
      placeholder={placeholder}
      value={value}
      onChange={handleChangeCallback}
      maxLength={maxLength}
      multiline={true}
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
  },
  bigForm: {
    height: 300,
    width: 350,
    textAlignVertical: 'top',
    textAlign: 'left',
    marginBottom: 20
  },
  mediumForm: {
    height: 200
  }
});

import React from 'react';
import { TextInput } from 'react-native-gesture-handler';
import {
  StyleSheet,
  TextInputProps,
  NativeSyntheticEvent,
  TextInputChangeEventData
} from 'react-native';

type Props = OwnProps;
type FormSize = 'small' | 'medium' | 'big';

/**
 * We can use extend so we dont have to write props that components already have
 */
interface OwnProps extends TextInputProps {
  propName: string;
  size: FormSize;
  handleChangeCallback: (propName: string, value: string) => void;
}

export const FormInput: React.FC<Props> = ({
  propName,
  placeholder,
  value,
  handleChangeCallback,
  maxLength,
  size
}) => {
  return (
    <TextInput
      style={getStyleList(size)}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      maxLength={maxLength}
      multiline={true}
    />
  );

  function onChange(event: NativeSyntheticEvent<TextInputChangeEventData>) {
    const { text } = event.nativeEvent;
    console.log(text);
    handleChangeCallback(propName, text);
  }

  function getStyleList(formInputSize: FormSize) {
    switch (formInputSize) {
      case 'small':
        return [styles.bodyForm];
      case 'medium':
        return [styles.bodyForm, styles.bigForm, styles.mediumForm];
      case 'big':
        return [styles.bodyForm, styles.bigForm];
      default:
        return '';
    }
  }
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

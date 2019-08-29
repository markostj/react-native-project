import React from 'react';
import { TextInput } from 'react-native-gesture-handler';
import {
  StyleSheet,
  TextInputProps,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  Text,
  View
} from 'react-native';

type FormSize = 'small' | 'medium' | 'big';
type Title = 'normal' | 'none' | 'margin';

/**
 * We can use extend so we dont have to write props that components already have
 */
interface Props extends TextInputProps {
  propName: string;
  size: FormSize;
  title: string;
  titleStyle: Title;
  handleChangeCallback: (propName: string, value: string) => void;
}

export const FormInput: React.FC<Props> = ({
  propName,
  placeholder,
  value,
  handleChangeCallback,
  maxLength,
  size,
  title,
  titleStyle
}) => {
  return (
    <View style={styles.container}>
      <Text style={getStyleTitle(titleStyle)}> {title} </Text>
      <TextInput
        style={getStyleList(size)}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        multiline={true}
        autoCorrect={false}
      />
    </View>
  );

  function onChange(event: NativeSyntheticEvent<TextInputChangeEventData>) {
    const { text } = event.nativeEvent;
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
        return [styles.bodyForm];
    }
  }

  function getStyleTitle(formTitle: Title) {
    switch (formTitle) {
      case 'normal':
        return [styles.containerTitle];
      case 'none':
        return [styles.none];
      case 'margin':
        return [styles.containerTitle, styles.margin];
      default:
        return [styles.containerTitle];
    }
  }
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10
  },
  bodyForm: {
    backgroundColor: '#fff',
    color: '#000',
    fontSize: 19,
    borderColor: 'gray',
    borderWidth: 1,
    width: 300
  },
  bigForm: {
    height: 300,
    marginBottom: 20
  },
  mediumForm: {
    height: 200
  },
  containerTitle: {
    fontSize: 20,
    marginBottom: 5
  },
  none: {
    display: 'none'
  },
  margin: {
    marginBottom: 10
  }
});

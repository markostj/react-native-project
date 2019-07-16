/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/emin93/react-native-template-typescript
 *
 * @format
 */

import React from 'react';

import AppContainer from './navigation/RootNavigator';

import { Provider } from 'react-redux';
import { configureStore } from './redux/store';

class App extends React.Component {
  store = configureStore();

  render() {
    return (
      <Provider store={this.store}>
        <AppContainer />
      </Provider>
    );
  }
}

export default App;

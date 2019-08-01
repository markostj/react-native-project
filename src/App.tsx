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

import './fixtimerbug';
/**
 * fixtimerbug is for setting a timer for a long period of time react native ERROR
 */

class App extends React.Component {
  store = configureStore();

  /**
   * onAuthStateChanged maybe put later?
   * can we make logout just with signOut and navigate to login page
   * or have to do with onAuthStateChanged
   *
   */

  render() {
    return (
      <Provider store={this.store}>
        <AppContainer />
      </Provider>
    );
  }
}

export default App;

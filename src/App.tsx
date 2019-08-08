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
import { FirebaseAuth } from './firebase/FirebaseService';
/**
 * fixtimerbug is for setting a timer for a long period of time react native ERROR
 */

FirebaseAuth.onAuthStateChanged(user => {
  if (user) {
    console.log('Loged in');
    console.log(user.uid);
  } else {
    console.log('Loged out');
  }
});

class App extends React.Component {
  store = configureStore();

  /**
   * signOut Because it stays loged in??
   */

  componentDidMount() {
    FirebaseAuth.signOut();
  }

  render() {
    return (
      <Provider store={this.store}>
        <AppContainer />
      </Provider>
    );
  }
}

export default App;

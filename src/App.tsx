/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/emin93/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect } from 'react';

import AppContainer from './navigation/RootNavigator';

import { Provider } from 'react-redux';
import { configureStore } from './redux/store';

import './fixtimerbug';
import { FirebaseAuth } from './firebase/FirebaseService';

import { PersistGate } from 'redux-persist/integration/react';
/**
 * fixtimerbug is for setting a timer for a long period of time react native ERROR
 */

const App: React.FC = () => {
  const persistedStore = configureStore();
  const { store, persistor } = persistedStore;

  useEffect(() => {
    FirebaseAuth.onAuthStateChanged(user => {
      if (user) {
        console.log('Loged in');
      } else {
        console.log('Loged out');
      }
    });
  });

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppContainer />
      </PersistGate>
    </Provider>
  );
};

export default App;

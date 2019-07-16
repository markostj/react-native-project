import MainNavigator from './MainNavigator';
import Modal from '../views/Modal';

import { createAppContainer, createStackNavigator } from 'react-navigation';

const RootNavigator = createStackNavigator(
  {
    Main: MainNavigator,
    MyModal: Modal
  },
  {
    mode: 'modal',
    headerMode: 'none'
  }
);

const AppContainer = createAppContainer(RootNavigator);

export default AppContainer;

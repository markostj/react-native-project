import Homepage from '../views/Homepage';
import RecordView from '../views/RecordView';
import LocationView from '../views/LocationView';
import MenuView from '../views/MenuView';
import CameraView from '../views/CameraView';
import ForgotPasswordView from '../views/ForgotPasswordView';
import ChangeAvatarView from '../views/ChangeAvatarView';

import { createStackNavigator } from 'react-navigation';

const MainNavigator = createStackNavigator(
  {
    App: {
      screen: Homepage,
      navigationOptions: {
        headerTitle: 'Hns Homepage'
      }
    },
    Location: {
      screen: LocationView,
      navigationOptions: {
        headerTitle: 'Location',
        headerLeft: null
      }
    },
    Menu: {
      screen: MenuView,
      navigationOptions: {
        headerTitle: 'Menu'
      }
    },
    Camera: {
      screen: CameraView,
      navigationOptions: {
        headerTitle: 'Camera'
      }
    },
    Record: {
      screen: RecordView,
      navigationOptions: {
        headerTitle: 'Record'
      }
    },
    ForgotPassword: {
      screen: ForgotPasswordView,
      navigationOptions: {
        headerTitle: 'Forgot Password'
      }
    },
    Avatar: {
      screen: ChangeAvatarView,
      navigationOptions: {
        headerTitle: 'Change Avatar Picture'
      }
    }
  },
  {
    initialRouteName: 'App',

    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e' // Change color
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    }
  }
);

export default MainNavigator;

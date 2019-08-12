import LoginView from '../views/LoginView';
import RecordView from '../views/RecordView';
import UserMenuView from '../views/UserMenuView';
import RecordMenuView from '../views/RecordMenuView';
import CameraView from '../views/CameraView';
import ForgotPasswordView from '../views/ForgotPasswordView';
import ChangeAvatarView from '../views/ChangeAvatarView';

import { createStackNavigator } from 'react-navigation';

const MainNavigator = createStackNavigator(
  {
    Login: {
      screen: LoginView,
      navigationOptions: {
        headerTitle: 'Login View'
      }
    },
    UserMenu: {
      screen: UserMenuView,
      navigationOptions: {
        headerTitle: 'User Menu',
        headerLeft: null
      }
    },
    RecordMenu: {
      screen: RecordMenuView,
      navigationOptions: {
        headerTitle: 'Record Menu'
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
    initialRouteName: 'Login',

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

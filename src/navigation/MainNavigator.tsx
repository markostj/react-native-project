import LoginView from '../views/LoginView';
import RecordView from '../views/RecordView';
import HomepageView from '../views/HomepageView';
import RecordMenuView from '../views/RecordMenuView';
import CameraView from '../views/CameraView';
import ForgotPasswordView from '../views/ForgotPasswordView';
import ChangeAvatarView from '../views/ChangeAvatarView';
import UserMenuView from '../views/UserMenuView';
import ChangeEmailView from '../views/ChangeEmailView';
import AdminView from '../views/AdminView';
import AddUserView from '../views/AddUserView';

import { createStackNavigator } from 'react-navigation';

const MainNavigator = createStackNavigator(
  {
    Login: {
      screen: LoginView,
      navigationOptions: {
        headerTitle: 'Login View'
      }
    },
    Homepage: {
      screen: HomepageView,
      navigationOptions: {
        headerTitle: 'Homepage',
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
    },
    UserMenu: {
      screen: UserMenuView,
      navigationOptions: {
        headerTitle: 'User Menu'
      }
    },
    ChangeEmail: {
      screen: ChangeEmailView,
      navigationOptions: {
        headerTitle: 'Change Email '
      }
    },
    Admin: {
      screen: AdminView,
      navigationOptions: {
        headerTitle: 'Admin',
        headerLeft: null
      }
    },
    AddUser: {
      screen: AddUserView,
      navigationOptions: {
        headerTitle: 'Add User'
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

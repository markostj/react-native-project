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
import AllGamesView from '../views/AllGamesView';
import UserGamesView from '../views/UserGamesView';

import { createStackNavigator } from 'react-navigation';

const MainNavigator = createStackNavigator(
  {
    Login: {
      screen: LoginView,
      navigationOptions: {
        header: null
      }
    },
    Homepage: {
      screen: HomepageView,
      navigationOptions: {
        header: null
      }
    },
    RecordMenu: {
      screen: RecordMenuView,
      navigationOptions: {
        headerTitle: 'Vrsta zapisnika'
      }
    },
    Camera: {
      screen: CameraView
    },
    Record: {
      screen: RecordView
    },
    ForgotPassword: {
      screen: ForgotPasswordView,
      navigationOptions: {
        headerTitle: 'Reset Password'
      }
    },
    Avatar: {
      screen: ChangeAvatarView,
      navigationOptions: {
        headerTitle: 'Promijeni profilnu sliku'
      }
    },
    UserMenu: {
      screen: UserMenuView,
      navigationOptions: {
        headerTitle: 'Korisnički profil'
      }
    },
    ChangeEmail: {
      screen: ChangeEmailView,
      navigationOptions: {
        headerTitle: 'Promijeni Email '
      }
    },
    Admin: {
      screen: AdminView,
      navigationOptions: {
        header: null
      }
    },
    AddUser: {
      screen: AddUserView,
      navigationOptions: {
        headerTitle: 'Dodaj korisnika'
      }
    },
    AllGames: {
      screen: AllGamesView,
      navigationOptions: {
        headerTitle: 'Sve utakmice'
      }
    },
    UserGames: {
      screen: UserGamesView,
      navigationOptions: {
        headerTitle: 'Korisnikove utakmice'
      }
    }
  },
  {
    initialRouteName: 'Homepage',

    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#DD0023' // Change color
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    }
  }
);

export default MainNavigator;

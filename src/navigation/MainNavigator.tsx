import { Homepage } from '../views/Homepage';
import HomeScreen from '../views/Homescreen';
import RecordView from '../views/RecordView';
import DetailsView from '../views/DetailsView';
import LocationView from '../views/LocationView';
import MenuView from '../views/MenuView';
import CameraView from '../views/CameraView';

import { createStackNavigator } from 'react-navigation';

const MainNavigator = createStackNavigator(
  {
    Home: {
      // Can we do it in defaultNavigationOptions smth like headerTitle:navigation.state.routeName
      screen: HomeScreen,
      navigationOptions: {
        headerTitle: 'Home'
      }
    },
    Details: {
      screen: DetailsView,
      navigationOptions: {
        headerTitle: 'Details'
      }
    },
    App: {
      screen: Homepage,
      navigationOptions: {
        headerTitle: 'Hns Homepage'
      }
    },
    Location: {
      screen: LocationView,
      navigationOptions: {
        headerTitle: 'Location'
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
    }
  },
  {
    initialRouteName: 'Record',

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

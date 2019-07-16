import Details from '../views/Details';
import { Homepage } from '../views/Homepage';
import HomeScreen from '../views/Homescreen';
import Location from '../views/Location';
import Menu from '../views/Menu';
import Camera from '../views/Camera';
import Record from '../views/Record';

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
      screen: Details,
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
      screen: Location,
      navigationOptions: {
        headerTitle: 'Location'
      }
    },
    Menu: {
      screen: Menu,
      navigationOptions: {
        headerTitle: 'Menu'
      }
    },
    Camera: {
      screen: Camera,
      navigationOptions: {
        headerTitle: 'Camera'
      }
    },
    Record: {
      screen: Record,
      navigationOptions: {
        headerTitle: 'Record'
      }
    }
  },
  {
    initialRouteName: 'Home',

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

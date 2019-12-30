import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import Explore from './Explore/index';

export default HomeTabNavigator = createMaterialTopTabNavigator(
  {
    Explore: {
      screen: Explore,
    },
    //TODO: Uncomment this to activate other tabs
    // News: {
    //   screen: News,
    // },
    // Events: {
    //   screen: Events,
    // },
    // Videos: {
    //   screen: Videos,
    // },
  },
  {
    swipeEnabled: true,
    tabBarOptions: {
      labelStyle: {
        fontSize: 14,
      },
      style: {
        backgroundColor: '#506ecc',
      },
      upperCaseLabel: false,
      indicatorStyle: {
        backgroundColor: 'white',
      },
    },
    navigationOptions: {
      gesturesEnabled: true,
    },
  },
);

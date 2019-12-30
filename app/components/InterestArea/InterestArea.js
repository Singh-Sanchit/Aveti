import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import InterestAreas from './InterestAreas/index';

export default (InterestAreaTabNavigator = createMaterialTopTabNavigator(
  {
    "Interest Areas": {
      screen: InterestAreas,
    }
  },
  {
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
  },
));

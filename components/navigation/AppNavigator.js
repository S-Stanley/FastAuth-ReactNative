import * as React from 'react'

import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import App from '../../App'
import Settings from '../account/settings/settings'
import Home from '../account/home/home'

const Tab = createBottomTabNavigator()

export default class AppNavigator extends React.Component {
  render(){
    return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={App} />
          <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
      </NavigationContainer>
    )
  }
}

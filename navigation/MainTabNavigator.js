/* eslint-env es6 */

import React from 'react'
import { Platform } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { TabNavigator, TabBarBottom } from 'react-navigation'

import Colors from '../constants/Colors'

import HomeScreen from '../screens/HomeScreen'
import OrdersScreen from '../screens/OrdersScreen'
import MachinesScreen from '../screens/MachinesScreen'
import SettingsScreen from '../screens/SettingsScreen'

export default TabNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    Machines: {
      screen: MachinesScreen
    },
    Orders: {
      screen: OrdersScreen
    },
    Settings: {
      screen: SettingsScreen
    }
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state
        let iconName
        switch (routeName) {
        case 'Home':
          iconName =
                            Platform.OS === 'ios'
                              ? `ios-home${focused ? '' : '-outline'}`
                              : 'md-home'
          break
        case 'Machines':
          iconName =
                            Platform.OS === 'ios'
                              ? `ios-jet${focused ? '' : '-outline'}`
                              : 'md-jet'
          break
        case 'Orders':
          iconName =
                            Platform.OS === 'ios'
                              ? `ios-paper${focused ? '' : '-outline'}`
                              : 'md-paper'
          break
        case 'Settings':
          iconName =
                            Platform.OS === 'ios'
                              ? `ios-happy${focused ? '' : '-outline'}`
                              : 'md-happy'
        }
        return (
          <Ionicons
            name={iconName}
            size={28}
            style={{ marginBottom: -3 }}
            color={
              focused
                ? Colors.tabIconSelected
                : Colors.tabIconDefault
            }
          />
        )
      }
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false
  }
)

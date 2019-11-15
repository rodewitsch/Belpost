import React from 'react';
import { Platform } from 'react-native';
import { createAppContainer, createSwitchNavigator, createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import ServicesScreen from '../screens/ServicesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ProfileDataScreen from '../screens/ProfileDataScreen';
import ProfileChangePass from '../screens/ProfileChangePass';
import ProfileAddressData from '../screens/ProfileAddressData';
import ProfileDocument from '../screens/ProfileDocument';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const ProfileStack = createStackNavigator(
  {
    Profile: ProfileScreen,
    ProfileData: ProfileDataScreen,
    ProfilePass: ProfileChangePass,
    ProfileAddressData: ProfileAddressData,
    ProfileDocument: ProfileDocument
  },
  config
);

ProfileStack.navigationOptions = {
  tabBarLabel: 'Профиль',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'} />
  ),
};

ProfileStack.path = '';

const ServicesStack = createStackNavigator(
  {
    Links: ServicesScreen,
  },
  config
);

ServicesStack.navigationOptions = {
  tabBarLabel: 'Услуги',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-list' : 'md-list'} />
  ),
};

ServicesStack.path = '';

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Настройки',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

SettingsStack.path = '';

const AppStack = createBottomTabNavigator({ ProfileStack, ServicesStack, SettingsStack });

AppStack.path = '';


export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
);



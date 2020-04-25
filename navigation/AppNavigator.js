import React from 'react';
import { Platform } from 'react-native';
import { createAppContainer, createSwitchNavigator, createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import ServicesScreen from '../screens/services/ServicesScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import PersonalInfoScreen from '../screens/profile/PersonalInfoScreen';
import ChangePassScreen from '../screens/profile/ChangePassScreen';
import AddAddressScreen from '../screens/profile/AddAddressScreen';
import PersonalDocumentScreen from '../screens/profile/PersonalDocumentScreen';
import AddressesScreen from '../screens/profile/AddressesScreen';
import TrackingScreen from '../screens/services/TrackingScreen';
import RedirectingScreen from '../screens/services/RedirectingScreen';
import EmailNoticeScreen from '../screens/services/EmailNoticeScreen';
import ArchiveScreen from '../screens/services/ArchiveScreen';
import AddTrackScreen from '../screens/services/AddTrackScreen';
import TrackingHistoryScreen from '../screens/services/TrackingHistoryScreen';
import SignInScreen from '../screens/SignInScreen';
import NewsScreen from '../screens/services/NewsScreen';
import { NewsItemScreen } from '../screens/services/NewsItemScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const ProfileStack = createStackNavigator(
  {
    Profile: ProfileScreen,
    PersonalInfo: PersonalInfoScreen,
    ChangePass: ChangePassScreen,
    Addresses: AddressesScreen,
    AddAddress: AddAddressScreen,
    PersonalDocument: PersonalDocumentScreen
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
    Services: ServicesScreen,
    Tracking: TrackingScreen,
    AddTrack: AddTrackScreen,
    TrackingHistory: TrackingHistoryScreen,
    Redirect: RedirectingScreen,
    EmailNotice: EmailNoticeScreen,
    Archive: ArchiveScreen,
    News: NewsScreen,
    NewsItem: NewsItemScreen
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

const AuthStack = createStackNavigator(
  {
    SignIn: SignInScreen
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

const AppStack = createBottomTabNavigator({ ServicesStack, ProfileStack, SettingsStack });

AppStack.path = '';


export default createAppContainer(
  createSwitchNavigator({
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack
  },
    {
      initialRouteName: 'AuthLoading',
    }
  )
);

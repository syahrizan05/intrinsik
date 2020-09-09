import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

import { BottomTabParamList, HomeParamList, WeeklyParamList, OtherCountryParamList } from '../types';
import WeatherScreen from '../screens/WeatherScreen';
import WeeklyWeatherScreen from '../screens/WeeklyWeatherScreen';
import OtherCountryScreen from '../screens/OtherCountryScreen';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

function getRouteName(route: any) {
  // If the focused route is not found, we need to assume it's the initial screen
  // This can happen during if there hasn't been any navigation inside the screen
  // In our case, it's "Feed" as that's the first screen inside the navigator
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';

  return routeName
}


export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Local"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="Local"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }: any) => <TabBarIcon name="ios-home" color={color} />,
        }}
      />
     

      <BottomTab.Screen
        name="OtherCountry"
        component={OtherCountryNavigator}
        options={({ route }: any) => {

          let tabBarVisible = true
          const routeName = getRouteName(route)
          if (routeName === 'Detail') {
            tabBarVisible = false
          }
          return {
            tabBarIcon: ({ color }: any) => <TabBarIcon name="ios-list" color={color} />, tabBarVisible
          }
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const HomeStack = createStackNavigator<HomeParamList>();

function HomeNavigator() {
  return (
    <HomeStack.Navigator headerMode={'none'}>
      <HomeStack.Screen
        name="Home"
        component={WeatherScreen}
        options={{ headerTitle: 'Home' }}
      />

    </HomeStack.Navigator>
  );
}



const OtherCountryStack = createStackNavigator<OtherCountryParamList>();

function OtherCountryNavigator() {
  return (
    <OtherCountryStack.Navigator headerMode={'none'}>
      <OtherCountryStack.Screen
        name="OtherCountry"
        component={OtherCountryScreen}
        options={{ headerTitle: 'Other Country' }}
      />

    </OtherCountryStack.Navigator>
  );
}
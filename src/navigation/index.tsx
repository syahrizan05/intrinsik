import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import RegistrationStack from './RegistrationStack';
import LoginScreen from '../screens/LoginScreen';


// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  const dispatch = useDispatch()
  const { loggedIn } = useSelector(state => state.connectionReducer, shallowEqual)
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {loggedIn ?
        <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} /> :
        <Stack.Screen name="Authentication" component={LoginScreen} options={{ headerShown: false }} />}
      <Stack.Screen name="Registration" component={RegistrationStack} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}

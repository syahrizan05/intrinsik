import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RegisterParamList } from '../types';

import RegisterScreen from '../screens/RegisterScreen';
import RegisterSuccessScreen from '../screens/RegisterSuccessScreen';

const Stack = createStackNavigator<RegisterParamList>();

const RegistrationStack = () => {
    return (
        <Stack.Navigator initialRouteName="Registration" mode="modal" screenOptions={{ headerShown: false }}>
             <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="RegisterSuccess" component={RegisterSuccessScreen} />
        </Stack.Navigator>
    )
}

export default RegistrationStack
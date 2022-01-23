import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import SignInScreen from '../../screens/SignInScreen'
import SignUpScreen from '../../screens/SignUpScreen'
import ForgotPasswordScreen from '../../screens/ForgotPasswordScreen'

export default function SignInNavigation(){
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen name="SignIn" component={SignInScreen} options={{
              headerShown: false,
            }}/>
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{
              headerShown: false,
            }}/>
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{
              headerShown: false,
            }}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

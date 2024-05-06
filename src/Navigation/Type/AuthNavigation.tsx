import { createStackNavigator } from '@react-navigation/stack';
import {StackRoute} from '../NavigationRoutes';

const AuthStack = createStackNavigator();

function AuthStackNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="LoginScreen" component={StackRoute.Common.LoginScreen} />
      <AuthStack.Screen name="SignupScreen" component={StackRoute.Common.SignupScreen} />
      <AuthStack.Screen name="ForgetPasswordScreen" component={StackRoute.Common.AuthScreen} />
      // Add other auth screens as needed
    </AuthStack.Navigator>
  );
}


export default AuthStackNavigator;
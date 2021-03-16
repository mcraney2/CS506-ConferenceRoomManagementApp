// This page will likely act as the controller in our MVC model
// It can tell screens what to display and pass them variables
// and also coordinate with the database about what data to query
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

// Import the screens needed for navigation
import { LogInScreen } from './screens/LogInScreen'
import { ManagementConsole } from './screens/ManagementConsole';
import { FirstLogInAdmin } from './screens/FirstLogInAdmin';
import { EditCalendarsAdmin }from './screens/EditCalendarsAdmin';
import { CheckRequestsAdmin } from './screens/CheckRequestsAdmin';
import { AddEventAdmin } from './screens/AddEventAdmin';
import { UserConsole } from './screens/UserConsole';
import { FirstLogInUser } from './screens/FirstLogInUser';
import { RequestRoomUser } from './screens/RequestRoomUser';
import { SignUpScreen } from './screens/SignUpScreen';
import { KioskMain } from './screens/KioskMain';
import { KioskSetUp } from './screens/KioskSetUp';

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LogInScreen">
        <Stack.Screen name="LogInScreen" component={LogInScreen} />
        <Stack.Screen name="ManagementConsole" component={ManagementConsole} />
        <Stack.Screen name="FirstLogInAdmin" component={FirstLogInAdmin} />
        <Stack.Screen name="EditCalendarsAdmin" component={EditCalendarsAdmin} />
        <Stack.Screen name="CheckRequestsAdmin" component={CheckRequestsAdmin} />
        <Stack.Screen name="AddEventAdmin" component={AddEventAdmin} />
        <Stack.Screen name="UserConsole" component={UserConsole} />
        <Stack.Screen name="FirstLogInUser" component={FirstLogInUser} />
        <Stack.Screen name="RequestRoomUser" component={RequestRoomUser} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name="KioskMain" component={KioskMain} />
        <Stack.Screen name="KioskSetUp" component={KioskSetUp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

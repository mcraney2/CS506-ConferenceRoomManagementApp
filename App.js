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
import  UserConsole  from './screens/UserConsole';
import { FirstLogInUser } from './screens/FirstLogInUser';
import { RequestRoomUser } from './screens/RequestRoomUser';
import { SignUpScreen } from './screens/SignUpScreen';
import { KioskMain } from './screens/KioskMain';
import { KioskSetUp } from './screens/KioskSetUp';

// I added this
import UserGroupCode from './screens/UserGroupCode';
import { Provider } from 'react-redux'
import store from './store/configureStore'
export default function App() {
  return (
    <Provider store = {store}>
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{
          headerStyle: {
            backgroundColor: 'red',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        initialRouteName="LogInScreen">
        <Stack.Screen name="LogInScreen" component={LogInScreen} options={{ title: 'Conference Room Management System' }}/>
        <Stack.Screen name="ManagementConsole" component={ManagementConsole} options={{ title: 'Management Console' }}/>
        <Stack.Screen name="FirstLogInAdmin" component={FirstLogInAdmin} options={{ title: 'Welcome New Administrator' }}/>
        <Stack.Screen name="EditCalendarsAdmin" component={EditCalendarsAdmin} options={{ title: 'Edit Calendars' }}/>
        <Stack.Screen name="CheckRequestsAdmin" component={CheckRequestsAdmin} options={{ title: 'Check Room Requests' }}/>
        <Stack.Screen name="AddEventAdmin" component={AddEventAdmin} options={{ title: 'Add New Event' }}/>
        <Stack.Screen name="UserConsole" component={UserConsole} options={{ title: 'User Console' }}/>
        <Stack.Screen name="FirstLogInUser" component={FirstLogInUser} options={{ title: 'Welcome New User' }} />
        <Stack.Screen name="RequestRoomUser" component={RequestRoomUser} options={{ title: 'Request Conference Room' }}/>
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{ title: 'Sign-Up' }}/>
        <Stack.Screen name="KioskMain" component={KioskMain} options={{ title: 'Kiosk Mode' }}/>
        <Stack.Screen name="KioskSetUp" component={KioskSetUp} options={{ title: 'Kiosk Set-Up' }}/>
        <Stack.Screen name="UserGroupCode" component={UserGroupCode} options={{ title: 'Enter User Group Code' }}/>
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
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

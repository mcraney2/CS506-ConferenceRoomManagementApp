import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from "../components/Button.js";

export function ManagementConsole({navigation}) {
    return (
        <View style={styles.container}>
            <Text>Management Console</Text>
            <Text>Conference Room Name/Number</Text>
            <Button 
                handleClick={() =>
                    navigation.navigate('ManagementConsole')
                }
                label="Add"
            />
            <Button 
                handleClick={() =>
                    navigation.navigate('CheckRequestsAdmin')
                }
                label="Check Room Requests"
            />
            <Button 
                handleClick={() =>
                    navigation.navigate('EditCalendarsAdmin')
                }
                label="Edit Calendars"
            />
            <Button 
                handleClick={() =>
                    navigation.navigate('UserConsole')
                }
                label="User View"
            />
        </View>
        
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
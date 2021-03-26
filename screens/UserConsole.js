import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from "../components/Button.js";
import DropDownPicker from 'react-native-dropdown-picker';
import { useState } from 'react';
import UserConsoleComponent from "../components/UserConsoleComponent.js"

export function UserConsole({navigation}) {
    return (
      <>
        <View style={styles.container}>
          <Text style={styles.textSty}>View Calendars</Text>
          <UserConsoleComponent />
        </View>
        <View style={styles.button}>
          <Button 
              handleClick={() =>
                  navigation.navigate('RequestRoomUser')
              }
              label="Request Conference Room"
          />
        </View>
      </>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 0.8,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    button: {
      flex: 0.2,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    sideBySide: {
      flex:0.1,
      margin:10,
      flexDirection:'row',
  },
  textSty: {
    fontSize:20,
    fontWeight:'bold',
    margin: 10,
  },
  });

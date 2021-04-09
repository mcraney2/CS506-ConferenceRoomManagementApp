import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from "../components/Button.js";

import UserConsoleComponent from "../components/UserConsoleComponent.js"

import { useSelector, useDispatch } from 'react-redux';
function UserConsole({navigation}, props) {
    
    
    return (
      <>
        <View style={styles.container}>
          
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

  export default UserConsole;
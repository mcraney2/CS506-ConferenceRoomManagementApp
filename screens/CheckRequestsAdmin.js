import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from "../components/Button.js";
import RoomRequestList from "../components/RoomRequestList"
export function CheckRequestsAdmin({navigation}) {
    return (
      <>
        <View style={styles.container}>
            <RoomRequestList/>
            
        </View>
        <Button 
        handleClick={() =>
            navigation.navigate('ManagementConsole')
        }
        label="Exit"
    />
    </>
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
  
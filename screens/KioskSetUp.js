import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from "../components/Button.js";

export function KioskSetUp({navigation}) {
    return (
        <View style={styles.container}>
            <Text>Kiosk Set-Up Screen</Text>
            <Button 
                handleClick={() =>
                    navigation.navigate('KioskMain')
                }
                label="Enter"
            />
            <Button 
                handleClick={() =>
                    navigation.navigate('LogInScreen')
                }
                label="Exit"
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
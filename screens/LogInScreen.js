import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from "../components/Button.js";

export function LogInScreen({navigation}) {
    return (
        <View style={styles.container}>
            <Text>Log-In</Text>
            <Button 
                handleClick={() =>
                    navigation.navigate('ManagementConsole')
                }
                label="Log-In"
            />
            <Text>New User</Text>
            <Button 
                handleClick={() =>
                    navigation.navigate('SignUpScreen')
                }
                label="Enter"
            />
            <Text>Kiosk Mode</Text>
            <Button 
                handleClick={() =>
                    navigation.navigate('KioskSetUp')
                }
                label="Enter"
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
  

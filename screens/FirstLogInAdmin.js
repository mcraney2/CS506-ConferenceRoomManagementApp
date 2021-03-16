import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from "../components/Button.js";

export function FirstLogInAdmin({navigation}) {
    return (
        <View style={styles.container}>
            <Text>First Log-In Admin:</Text>
            <Button 
                handleClick={() =>
                    navigation.navigate('ManagementConsole')
                }
                label="Create"
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
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from "../components/Button.js";

export function AddEventAdmin({navigation}) {
    return (
        <View style={styles.container}>
            <Text>Add Event To:</Text>
            <Button 
                handleClick={() =>
                    navigation.navigate('ManagementConsole')
                }
                label="Schedule"
            />
            <Button 
                handleClick={() =>
                    navigation.navigate('ManagementConsole')
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

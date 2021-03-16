import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from "../components/Button.js";

export function EditCalendarsAdmin({navigation}) {
    return (
        <View style={styles.container}>
            <Text>Edit Calendars</Text>
            <Button 
                handleClick={() =>
                    navigation.navigate('AddEventAdmin')
                }
                label="Add Event"
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
  
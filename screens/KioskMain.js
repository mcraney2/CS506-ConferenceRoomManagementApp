import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from "../components/Button.js";
import { Calendar } from 'react-native-big-calendar'
export function KioskMain({navigation}) {
  const events = [
    {
      title: 'Meeting',
      start: new Date(2021, 3, 26, 10, 0),
      end: new Date(2021, 3, 26, 10, 30),
    },
    
  ]
    return (
        <View style={styles.container}>
            <Text>Kiosk Main Display</Text>
            <Text style={styles.textSty}>Room 1080</Text>
            <View style={styles.calendarContainer}>
            <Calendar events={events} height={400} />
          </View>
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
    calendarContainer: {
      flex:1,
      width: 300,
    },
    textSty: {
      fontSize:20,
      fontWeight:'bold',
      margin: 10,
    },
  });


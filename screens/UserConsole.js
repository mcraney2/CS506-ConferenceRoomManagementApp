import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from "../components/Button.js";
import { Calendar } from 'react-native-big-calendar'
import DropDownPicker from 'react-native-dropdown-picker';
import { useState } from 'react';

export function UserConsole({navigation}) {
    
    const [room, setRoom] = useState('rm1080');

    const events = [
      {
        title: 'Meeting',
        start: new Date(2021, 3, 21, 10, 0),
        end: new Date(2021, 3, 21, 10, 30),
      },
      {
        title: 'Coffee break',
        start: new Date(2021, 3, 22, 15, 45),
        end: new Date(2021, 3, 22, 16, 30),
      },
    ]

    return (
        <View style={styles.container}>
          <View style={styles.sideBySide}>
            <Text style={styles.textSty}>Room Selection:</Text>
            <DropDownPicker
                        items={[
                            {label: 'Room 1080', value: 'rm1080'},
                            {label: 'Room 1100', value: 'rm1100'},
                            {label: 'Room 380', value: 'rm380'},
                        ]}
                        defaultValue={room}
                        containerStyle={{height: 40, width:150}}
                        style={{backgroundColor: '#fafafa'}}
                        itemStyle={{
                            justifyContent: 'flex-start'
                        }}
                        dropDownStyle={{backgroundColor: '#fafafa'}}
                        onChangeItem={room => setRoom(room)}
                        
                    />
          </View>
          <Button 
                handleClick={() =>
                    navigation.navigate('RequestRoomUser')
                }
                label="Request Conference Room"
            />
          <View style={styles.calendarContainer}>
            <Calendar events={events} height={400} />
          </View>
            
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

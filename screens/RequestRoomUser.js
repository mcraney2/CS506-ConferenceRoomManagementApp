import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from "../components/Button.js";

import UserRoomRequest from '../components/UserRoomRequest.js';
export function RequestRoomUser({navigation}) {
    return (
        <>
        <View style={styles.container}>
            <UserRoomRequest/>
            <View style={styles.margin}>
                <View style={styles.button}>
                    <Button 
                    handleClick={() =>
                        navigation.navigate('UserConsole')
                    }
                    label="Request"
                    />
                </View>
                <View style={styles.button}>
                    <Button 
                    handleClick={() =>
                        navigation.navigate('UserConsole')
                    }
                    label="Exit"
                    />
                </View>
            </View>
        </View>
</>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      //alignItems: 'center',
      justifyContent: 'flex-start',
    },
    button: {
        //flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginTop: 5
    },
    margin: {
        marginTop: 150,
        marginBottom: 20,
        alignItems: 'center',
    },
  });

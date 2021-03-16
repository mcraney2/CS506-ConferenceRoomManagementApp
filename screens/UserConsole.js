import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from "../components/Button.js";

export function UserConsole({navigation}) {
    return (
        <View style={styles.container}>
            <Text>User Console</Text>
            <Button 
                handleClick={() =>
                    navigation.navigate('RequestRoomUser')
                }
                label="Request Conference Room"
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

import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from "../components/Button.js";
import TextBox from "../components/TextBox.js";
import { Value } from 'react-native-reanimated';

export function ManagementConsole({navigation}) {
    return (
        <View style={styles.container}>
            <Text style={styles.textSty}>Management Console</Text>
            <Text style={styles.textSty2}>Group Code: </Text>
            <Text style={styles.textSty3}>Add Conference Room: </Text>
            <TextBox
                height={30}
                width={220}
                borderColor={"grey"}
                borderWidth={1}
                margin={10}
                placeholder=' Conference Room Name/Number'
            />
            <Button 
                handleClick={() =>
                    navigation.navigate('ManagementConsole')
                }
                label="Add"
                
            />
            <View style={styles.container2}>      
                <Button 
                    handleClick={() =>
                        navigation.navigate('CheckRequestsAdmin')
                    }
                    label="Check Room Requests"
                />
            </View>
            <View style={styles.container2}>
                <Button 
                    handleClick={() =>
                        navigation.navigate('EditCalendarsAdmin')
                    }
                    label="Edit Calendars"
                />
            </View>
            <View style={styles.container2}>
                <Button 
                    handleClick={() =>
                        navigation.navigate('UserConsole')
                    }
                    label="User View"
                />
            </View>
        </View>
        
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      marginBottom: 10,
    },
    container2: {
      backgroundColor: '#fff',
      alignItems: 'center',
      marginTop: 50,
    },
    textSty: {
      fontWeight:'bold',
      fontSize:30,
    },
    textSty2: {
      fontSize:20,
      marginBottom: 20,
      marginTop: 20,
    },
    textSty3: {
      fontSize:20,
    },
  });
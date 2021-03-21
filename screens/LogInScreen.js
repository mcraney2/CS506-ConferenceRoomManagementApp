import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from "../components/Button.js";
import TextBox from "../components/TextBox.js"

export function LogInScreen({navigation}) {
    return (
        <View style={styles.container}>
            <View style={styles.LogInContainer}>
                <Text style={styles.textSty}>Log-In</Text>
                <TextBox 
                    height={30}
                    width={200}
                    borderColor={"grey"}
                    borderWidth={1}
                    margin={10}
                    placeholder="Username"
                />
                <TextBox 
                    height={30}
                    width={200}
                    borderColor={"grey"}
                    borderWidth={1}
                    margin={10}
                    placeholder="Password"
                />
                <Button 
                    handleClick={() =>
                        navigation.navigate('ManagementConsole')
                    }
                    label="Log-In"
                />
            </View>
            <View style={styles.SecondaryContainer}>
                <Text style={styles.textSty}>New Users</Text>
                <Button 
                    handleClick={() =>
                        navigation.navigate('SignUpScreen')
                    }
                    label="Enter"
                />
            </View>
            <View style={styles.SecondaryContainer}>
                <Text style={styles.textSty}>Kiosk Mode</Text>
                <Button 
                    handleClick={() =>
                        navigation.navigate('KioskSetUp')
                    }
                    label="Enter"
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
      justifyContent: 'center',
    },
    LogInContainer: {
        flex:0.4,
    },
    SecondaryContainer: {
        flex:0.3,
    },
    textSty: {
        fontSize:30,
        fontWeight:'bold',
        margin: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
  });
  

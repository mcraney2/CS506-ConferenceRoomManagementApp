import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from "../components/Button.js";
import TextBox from "../components/TextBox.js";
import RadioBut from "../components/RadioButtons.js";
import SignUp from "../components/SignUpComponent.js"


export function SignUpScreen({navigation}) {
    return (
        <View style={styles.container}>
            <Text style={styles.textSty}>New User</Text>
            <View style={styles.container2}>
                <SignUp />
            </View>
            <View style={styles.container3}>
                
            </View>
            <View style={styles.container3}>
                <Button 
                    handleClick={() =>
                        navigation.navigate('LogInScreen')
                    }
                    label="Exit"
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
    },
    container2: {
        backgroundColor: '#fff',
        alignItems: 'center',
        marginTop: 10,
    },
    container3: {
        backgroundColor: '#fff',
        alignItems: 'center',
        marginTop: 50,
    },
    textSty: {
        fontSize:30,
        fontWeight: 'bold',
    },
    textSty2: {
      fontSize:20,
    },
  });

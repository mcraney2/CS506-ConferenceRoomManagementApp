import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from "../components/Button.js";
import TextBox from "../components/TextBox.js";
import RadioBut from "../components/RadioButtons.js";

export function SignUpScreen({navigation}) {
    return (
        <View style={styles.container}>
            <Text style={styles.textSty}>New User</Text>
            <View style={styles.container2}>
                <Text style={styles.textSty2}>Enter Username:</Text>
                <TextBox
                    height={30}
                    width={220}
                    borderColor={"grey"}
                    borderWidth={1}
                    margin={10}
                    placeholder='Username'
                />
                <Text style={styles.textSty2}>Enter Password:</Text>
                <TextBox
                    height={30}
                    width={220}
                    borderColor={"grey"}
                    borderWidth={1}
                    margin={10}
                    placeholder='Password'
                />
                <Text style={styles.textSty2}>Re-Enter Password:</Text>
                <TextBox
                    height={30}
                    width={220}
                    borderColor={"grey"}
                    borderWidth={1}
                    margin={10}
                    placeholder='Password'
                />
                <Text style={styles.textSty2}>Role:</Text>
                <RadioBut
                    label1='Administrator'
                    label2='User'
                    layout='column'
                />
            </View>
            <View style={styles.container3}>
                <Button 
                    handleClick={() =>
                        navigation.navigate('LogInScreen')
                    }
                    label="Sign-Up"
                />
            </View>
            <View style={styles.container3}>
                <Button 
                    handleClick={() =>
                        navigation.navigate('LogInScreen')
                    }
                    label="Cancel"
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
        marginTop: 10,
    },
    textSty: {
        fontSize:30,
        fontWeight: 'bold',
    },
    textSty2: {
      fontSize:20,
    },
  });

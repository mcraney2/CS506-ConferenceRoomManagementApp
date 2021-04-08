import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from "../components/Button.js";
import TextBox from "../components/TextBox.js"
import LogInComponent from '../components/LogInComponent.js';
import UserTextInput from '../components/UserTextInput.js';
import axios from 'axios';

// Replace part of the return interior with the LogInComponent when we figure out how to navigate between screens from
// components classes

function sendRequest(username, password,authenticated, setAuthenticated, isAdmin, setIsAdmin) {
    console.log(username, password);
    const request = JSON.stringify(
      { 
        username: username,
        password: password

    });
     axios.post('http://10.0.2.2:8000/room_mgmt/login', request) 
     .then(function (response) {
        setAuthenticated(response['Authenticated']);
        setIsAdmin(response['type'] === 'admin');
        authenticated ? isAdmin ? navigation.navigate('ManagementConsole') : navigation.navigate('UserConsole') : navigation.navigate('LogInScreen');
    })
    .catch(function (error) {
      
      console.log(error);
      console.log("Caught error");
    });
}

export function LogInScreen({navigation}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [authenticated, setAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    console.log(username);
    return (
        <View style={styles.container}>
            <Text>Log-In</Text>
            <Text>Goes to 1st user screen. Delete later.</Text>
            <Button
                handleClick={() =>
                    navigation.navigate('FirstLogInUser')
                }
                label="First User Screen (FOR TESTING)"
            />
                  
            <View style={styles.LogInContainer}>
                <Text style={styles.textSty}>Log-In</Text>
                <TextBox 
                    height={30}
                    width={200}
                    borderColor={"grey"}
                    borderWidth={1}
                    margin={10}
                    placeholder="Username"
                    value = {username}
                    setValue = {setUsername}
                />
                
                <TextBox 
                    height={30}
                    width={200}
                    borderColor={"grey"}
                    borderWidth={1}
                    margin={10}
                    placeholder="Password"
                    value = {password}
                    setValue = {setPassword}
                />
                <Button 
                    handleClick={() =>
                        //password === 'pizza' ? navigation.navigate('ManagementConsole') : navigation.navigate('LogInScreen')
                        sendRequest(username, password,authenticated, setAuthenticated,isAdmin, setIsAdmin)
                        
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
            {/* <LogInComponent navigation = {navigation}/> */}
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
  

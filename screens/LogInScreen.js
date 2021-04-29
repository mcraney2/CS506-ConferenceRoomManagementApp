import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from "../components/Button.js";
import TextBox from "../components/TextBox.js"
import LogInComponent from '../components/LogInComponent.js';
import UserTextInput from '../components/UserTextInput.js';
import axios from 'axios';
import {setUserID} from '../actions/userIDActionCreator'
import { useSelector, useDispatch } from 'react-redux';
// Replace part of the return interior with the LogInComponent when we figure out how to navigate between screens from
// components classes

function sendRequest(username, password,authenticated, setAuthenticated, isAdmin, setIsAdmin, navigation,setLogInAttempt, dispatch) {
    const request = JSON.stringify(
      { 
        username: username,
        password: password

    });
     axios.post('http://10.0.2.2:8000/room_mgmt/login/', request) 
     .then(function (response) {
        setLogInAttempt(true);
        setAuthenticated(response.data.authenticated);
        setIsAdmin(response.data.type);
        console.log(response.data);
        if (response.data.authenticated) {
            console.log('userid: ', response.data.userid);
            dispatch(setUserID(response.data.userid));
        }
        response.data.authenticated == true ? response.data.type == "admin" ? navigation.navigate('ManagementConsole') : navigation.navigate('UserGroupCode') : navigation.navigate('LogInScreen');
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
    const [logInAttempt, setLogInAttempt] = useState(false);
    const dispatch = useDispatch();
    //console.log(username);
    let invalid;
    if(logInAttempt && !authenticated) {
        invalid = <Text style={styles.textSty3}>Incorrect username or password.</Text>
    }
    else {
        invalid = <Text></Text>
    }
    return (
        <View style={styles.container}>
            {/* <Text>Log-In</Text>
            <Text>Goes to 1st user screen. Delete later.</Text>
            <Button
                handleClick={() =>
                    navigation.navigate('FirstLogInUser')
                }
                label="First User Screen (FOR TESTING)"
            /> */}
                  
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
                        sendRequest(username, password,authenticated, setAuthenticated,isAdmin, setIsAdmin, navigation,setLogInAttempt, dispatch)
                        
                    }
                    label="Log-In"
                />
                {invalid}
                <Text style={styles.textSty}>New Users</Text>
                <Button 
                    handleClick={() =>
                        navigation.navigate('SignUpScreen')
                    }
                    label="Enter"
                />
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
      //justifyContent: 'center',
      marginBottom: 10,
    },
    LogInContainer: {
      flex:0.4,
      alignItems: 'center',
      marginTop: 20,
    },
    SecondaryContainer: {
      flex:0.3,
      alignItems: 'center',
      marginTop: 20,
    },
    textSty: {
      fontSize:30,
      fontWeight:'bold',
      alignItems: 'center',
      //justifyContent: 'center',
      marginTop: 20,
    },
    textSty3: {
        fontSize:20,
        color:'red',
    },
  });
  

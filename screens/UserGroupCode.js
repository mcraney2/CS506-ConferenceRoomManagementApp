import 'react-native-gesture-handler';

import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from "../components/Button.js";
import TextBox from "../components/TextBox.js"
import { connect } from 'react-redux';
import axios from 'axios';
import { setUserGroup, resetUserGroup } from '../actions/GroupCodeActionCreators';
import { useSelector, useDispatch } from 'react-redux';
// Replace part of the return interior with the LogInComponent when we figure out how to navigate between screens from
// components classes
function addGroupCode(groupname) {
    const request = JSON.stringify(
      { 
        
        groupname: groupname

    });
     axios.post('http://10.0.2.2:8000/room_mgmt/admin/create_group/', request) 
     .then(function (response) {
       console.log(response.data)
    })
    .catch(function (error) {
      
      console.log(error);
      console.log("oof");
    });
}

function sendRequest(groupcode, navigation, dispatch) {
    const request = JSON.stringify(
      { 
        userid: 1,
        groupcode: groupcode

    });
     axios.post('http://10.0.2.2:8000/room_mgmt/user/join_group/', request) 
     .then(function (response) {
       dispatch(setUserGroup(
           {groupcode: groupcode,
            groupid: response.data.groupid
           }));
       navigation.navigate('UserConsole');
    })
    .catch(function (error) {
      
      console.log(error);
      console.log("Invalid group maybe?");
    });
}

function UserGroupCode({navigation}) {
    const [groupcode, setGroupcode] = useState('');
    const [groupname, setGroupname] = useState('');
    const counter = useSelector(state => state);
    const dispatch = useDispatch();
    //console.log(counter);
    //console.log(username);
    // let invalid;
    // if(logInAttempt && !authenticated) {
    //     invalid = <Text style={styles.textSty3}>Incorrect username or password</Text>
    // }
    // else {
    //     invalid = <Text></Text>
    // }
    return (
        <View style={styles.container}>
            

                  
           
                <Text style={styles.textSty}>Admin Create Group</Text>
                <TextBox 
                    height={100}
                    width={250}
                    borderColor={"grey"}
                    borderWidth={1}
                    margin={10}
                    placeholder="Group Name"
                    value = {groupname}
                    setValue = {setGroupname}
                />
            
                <Button 
                    handleClick={() =>
                        addGroupCode(groupname)
                        
                    }
                    label="Enter"
                />


                <Text style={styles.textSty}>Enter Group Code</Text>
                <TextBox 
                    height={100}
                    width={250}
                    borderColor={"grey"}
                    borderWidth={1}
                    margin={10}
                    placeholder="Group Code"
                    value = {groupcode}
                    setValue = {setGroupcode}
                />
            
                <Button 
                    handleClick={() =>
                        sendRequest(groupcode, navigation, dispatch)
                        
                    }
                    label="Enter"
                />
                {/* {invalid} */}
            
            {/* <View style={styles.SecondaryContainer}>
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
            </View> */}
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
    textSty3: {
        fontSize:20,
        color:'red',
    },
  });


  export default UserGroupCode;

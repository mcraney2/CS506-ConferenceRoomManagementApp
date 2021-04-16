import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
<<<<<<< HEAD
import { React, useState } from 'react';
=======
import React, { useState } from 'react';
>>>>>>> b9387df5b931ccc0b260448831728aa9129f8dc1
import { StyleSheet, Text, View } from 'react-native';
import Button from "../components/Button.js";
import UserTextInput from "../components/UserTextInput.js";
import TextBox from "../components/TextBox.js";
import AddRooms from "../components/AddRooms.js";

import { Value } from 'react-native-reanimated';
<<<<<<< HEAD
import { connect } from 'react-redux';
import axios from 'axios';
import { setUserGroup, resetUserGroup } from '../actions/GroupCodeActionCreators';
import { useSelector, useDispatch } from 'react-redux';

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
=======
import axios from 'axios';
function addGroupCode(groupname) {
  const request = JSON.stringify(
    { 
      
      groupname: groupname
>>>>>>> b9387df5b931ccc0b260448831728aa9129f8dc1

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
export function ManagementConsole({navigation}) {
<<<<<<< HEAD
    const [groupcode, setGroupcode] = useState('');
    const [groupname, setGroupname] = useState('');
    const counter = useSelector(state => state);
    const dispatch = useDispatch();
    return (
        <View style={styles.container}>
            <Text style={styles.textSty}>Management Console</Text>
            <Text style={styles.textSty2}>Add Group: </Text>
            <UserTextInput 
                placeHolder="Group Name"
                value = {groupname}
                setValue = {setGroupname}
            />
        
            <Button 
                handleClick={() =>
                    addGroupCode(groupname)
                    
                }
                label="Enter"
            />

=======
  const [groupname, setGroupname] = useState('');
    return (
        <View style={styles.container}>
            <Text style={styles.textSty}>Management Console</Text>
            <Text style={styles.textSty}>Admin Create Group</Text>
                <TextBox 
                    height={50}
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
>>>>>>> b9387df5b931ccc0b260448831728aa9129f8dc1
            <Text style={styles.textSty3}>Add Conference Room: </Text>
            <AddRooms/>
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

import React, { Component } from 'react';
import { Text, TouchableOpacityBase, View,StyleSheet} from 'react-native';

import DateTimeSelector from './DateTimeSelector'
import DurationDropDown from './DurationDropDown'
import RoomSelectDropdown from './RoomSelectDropdown'
import Button from './Button'
import axios from 'axios'
import RadioBut from "../components/RadioButtons.js";
import UserTextInput from './UserTextInput'

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            pass: '',
            passCheck: '',
            admin: 'User',
        }
    }
    setUsername (newName) {
        this.setState({username:newName});
    }
    setPass (newPass) {
        this.setState({pass:newPass});
    }
    setPassCheck (newPassCheck) {
        this.setState({passCheck:newPassCheck});
    }
    setAdmin (newAdmin) {
        this.setState({admin:newAdmin});
    }
    sendRequest(userName, pass, passcheck, usertype) {
        console.log(userName, pass, usertype);
        var isUser = true;
        if(usertype == 'Admin') {
            isUser = false;
        }
        if(pass == passcheck) {
            const request = JSON.stringify(
            { 
                username:userName,
                password:pass,
                user:isUser,
            });
            axios.post('http://10.0.2.2:8000/room_mgmt/signup/', request)
            .then(function (response) {
            console.log(response);
            })
            .catch(function (error) {
            console.log(error);
            });
        }
        else {
            console.log('Passwords do not match.');
        }
    }
    render() {
        let passMatch;
        if(this.state.passCheck != this.state.pass) {
            passMatch = <Text style={styles.textSty3}>Passwords do not match.</Text>
        }
        else {
            passMatch = <Text></Text>
        }
        return (
            <View>
                <Text style={styles.textSty2}>Enter Username:</Text>
                <UserTextInput
                    placeHolder='Username'
                    value = {this.username}
                    setValue = {this.setUsername.bind(this)}
                />
                <Text style={styles.textSty2}>Enter Password:</Text>
                <UserTextInput
                    placeHolder='Password'
                    value = {this.pass}
                    setValue = {this.setPass.bind(this)}
                />
                <Text style={styles.textSty2}>Re-Enter Password:</Text>
                <UserTextInput
                    placeHolder='Re-Enter Password'
                    value = {this.passCheck}
                    setValue = {this.setPassCheck.bind(this)}
                />
                {passMatch}
                <Text style={styles.textSty2}>Role: {this.state.admin}</Text>
                <Button
                    handleClick={
                        () => this.setAdmin('User')
                    }
                    label="User"
                />
                <Button
                    handleClick={
                        () => this.setAdmin('Admin')
                    }
                    label="Administrator"
                />
                <View style={styles.container3}>
                    <Button 
                        handleClick={
                            () => this.sendRequest(this.state.username, this.state.pass, this.state.passCheck, this.state.admin)
                        }
                        label="Sign-Up"
                    />
                </View>
            </View>
        );
    }

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
    textSty3: {
        fontSize:20,
        color:'red',
    },
  });

export default SignUp;
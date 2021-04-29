import React, { Component } from 'react';
import { Text, TouchableOpacityBase, View,StyleSheet, Alert} from 'react-native';
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
            signedUp: 'NA',
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
    setSignedUp (newSignedUp) {
        this.setState({signedUp:newSignedUp});
    }
    success(response) {
        console.log(response);
        this.setSignedUp ('Success');
    }
    fail(error) {
        console.log(error);
        this.setSignedUp('UniqUser');
    }
    sendRequest(userName, pass, passcheck, usertype) {
        console.log(userName, pass, usertype);
        var isUser = true;
        if(usertype == 'Admin') {
            isUser = false;
        }
        if(pass == passcheck && pass != '' && userName != '') {
            const request = JSON.stringify(
            { 
                username:userName,
                password:pass,
                user:isUser,
            });
            axios.post('http://10.0.2.2:8000/room_mgmt/signup/', request)
            .then((response) => {
                this.success(response);
            })
            .catch((error) => {
                this.fail(error);
            });
        }
        else if(userName == '') {
            console.log('Username is Empty');
            this.setSignedUp('UserEmpty');
        }
        else if(pass == '') {
            console.log('Password is empty.');
            this.setSignedUp('PassEmpty');
        }
        else {
            console.log('Passwords do not match.');
            this.setSignedUp('PassMatch');
        }
    }
    render() {
        let passMatch;
        let signUpSuccess;
        if(this.state.passCheck != this.state.pass) {
            passMatch = <Text style={styles.textSty3}>Passwords do not match.</Text>
        }
        else {
            passMatch = <Text></Text>
        }
        if(this.state.signedUp == 'Success') {
            signUpSuccess = <Text style={styles.textSty4}>Sign-Up Successful.{"\n"}Please Exit and Continue to LogIn.</Text>
            
        }
        else if(this.state.signedUp == 'PassMatch') {
            signUpSuccess = <Text style={styles.textSty3}>Sign-Up Unsuccessful.{"\n"}Passwords Don't Match.</Text>
        }
        else if(this.state.signedUp == 'UniqUser') {
            signUpSuccess = <Text style={styles.textSty3}>Sign-Up Unsuccessful. {"\n"}Username May Already Be Taken.</Text>
        }
        else if(this.state.signedUp == 'UserEmpty') {
            signUpSuccess = <Text style={styles.textSty3}>Sign-Up Unsuccessful. {"\n"}Username Is Empty.</Text>
        }
        else if(this.state.signedUp == 'PassEmpty') {
            signUpSuccess = <Text style={styles.textSty3}>Sign-Up Unsuccessful. {"\n"}Password Is Empty.</Text>
        }
        else {
            signUpSuccess = <Text></Text>
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
                <View style={styles.button}>
                    <Button
                        handleClick={
                            () => this.setAdmin('User')
                        }
                        label="User"
                    />
                </View>
                <View style={styles.button}>
                    <Button
                        handleClick={
                            () => this.setAdmin('Admin')
                        }
                        label="Administrator"
                    />
                </View>
                <View style={styles.container3}>
                    <Button 
                        handleClick={
                            () => this.sendRequest(this.state.username, this.state.pass, this.state.passCheck, this.state.admin)
                        }
                        label="Sign-Up"
                    />
                </View>
                {signUpSuccess}
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
        marginTop: 50,
    },
    textSty: {
        fontSize:30,
        fontWeight: 'bold',
    },
    textSty2: {
        fontSize:20,
        alignItems: 'center',
    },
    textSty3: {
        fontSize:20,
        alignItems: 'center',
        color:'red',
    },
    textSty4: {
        fontSize:20,
        alignItems: 'center',
        color:'green',
    },
    button: {
        //flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 5,
    },
  });

export default SignUp;
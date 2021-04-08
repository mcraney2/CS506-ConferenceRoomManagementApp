import React, { Component } from 'react';
import { Text, TouchableOpacityBase, View,StyleSheet} from 'react-native';

import RoomSelectDropdown from '../components/RoomSelectDropdown'
import UserTextInput from '../components/UserTextInput'
import Button from '../components/Button'
import axios from 'axios'
import { TextInput } from 'react-native-gesture-handler';
import RepeatSelectDropdown from './RepeatSelectDropdown';
import { Calendar } from 'react-native-big-calendar';

class LogInComponent extends Component {
    
    constructor(props) {
        super(props);
        this.state = { 
            username: '',
            password: '',
            response: ''
        }
    }
    static navigationOptions = {
        title : 'Home',
    };

    setUsername (newUsername) {
        this.setState({username : newUsername});
    }

    setPassword (newPassword) {
        this.setState({password : newPassword});
    }

    sendRequest(username, password) {
        console.log(username, password);
        const request = JSON.stringify(
          { 
            username: username.value,
            password: password.value

        });
        axios.get('http://10.0.2.2:8000/room_mgmt/login', request) 
        .then(function (response) {
          this.state.response = response;
          // Now based on authentication/accoutn status decide where to navigate
          // Authentication is false, deny log-in so do nothing ?
          if (this.state.response['authenticated'] == false) {

          }
          // Authentication is true
          else {
              // Redirect to managment console
              if(this.state.response['accountType'] == 'admin') {
                    this.props.navigation.navigate('ManagementConsole')
              }
              // Redirect to user console
              else {
                    this.props.navigation.navigate('UserConsole');
              }
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    render() { 
        return ( 
            <>
            <View>
                <Text styles={styles.textSty3}>Log-In Information</Text>
                <UserTextInput placeHolder = 'Username' value = {this.state.username} setValue = {this.setUsername.bind(this)}/>
                <UserTextInput placeHolder = 'Password' value = {this.state.password} setValue = {this.setPassword.bind(this)}/>
                <Button 
                        // Make this the line the replacement when everything has been handled
                        // handleClick = {() => this.sendRequest(this.state.username, this.state.password)}
                        handleClick = {() => this.props.navigation.navigate('Management Console')}
                        label = "Log-In"
                    />
            </View>
            </>
        );
    }
}
const styles = StyleSheet.create({
    input: {
        paddingRight: 10,
        lineHeight: 23,
        flex: 1,
        textAlignVertical: 'top'
    },
    container: {
        flex: 0.8,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
    container2: {
        margin:10,
        flex:1,
        width:350,
    },
    sideBySide: {
        flex:0.3,
        margin:10,
        flexDirection:'row',
    },
    button: {
        margin: 10,
    },
    textSty3: {
        fontSize:20,
        fontWeight:'bold',
        marginTop: 10,
        marginRight: 10,
        marginBottom: 10,
        marginLeft: 10,
        color:'#474747',
    },
})

export default LogInComponent;
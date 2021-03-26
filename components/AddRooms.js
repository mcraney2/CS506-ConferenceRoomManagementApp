import React, { Component } from 'react';
import { Text, TouchableOpacityBase, View,StyleSheet} from 'react-native';

import DateTimeSelector from './DateTimeSelector'
import DurationDropDown from './DurationDropDown'
import RoomSelectDropdown from './RoomSelectDropdown'
import UserTextInput from './UserTextInput'
import Button from './Button'
import axios from 'axios'
import { TextInput } from 'react-native-gesture-handler';

class AddRooms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roomNum: '0',
        }
    }
    setRoomNum (newRoom) {
        this.setState({roomNum:newRoom});
    }
    sendRequest(room) {
        console.log(room);
        const request = JSON.stringify(
          { 
            roomnumber:room,
        });
        axios.post('http://10.0.2.2:8000/room_mgmt/admin/add_room/', request)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      }
    render() {
        return (
            <View>
                <UserTextInput 
                    placeHolder = 'Conference Room Name/Number'
                    value = {this.roomNum}
                    setValue = {this.setRoomNum.bind(this)}
                />
                <Button 
                    handleClick={() => this.sendRequest(this.state.roomNum)}
                    label="Add"
                />
            </View>
        );
    }

}

export default AddRooms;
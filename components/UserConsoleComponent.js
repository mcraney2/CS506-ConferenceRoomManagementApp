import React, { Component } from 'react';
import { Text, TouchableOpacityBase, View,StyleSheet} from 'react-native';

import RoomSelectDropdown from '../components/RoomSelectDropdown'
import UserTextInput from '../components/UserTextInput'
import Button from '../components/Button'
import axios from 'axios'
import { TextInput } from 'react-native-gesture-handler';
import RepeatSelectDropdown from './RepeatSelectDropdown';
import { Calendar } from 'react-native-big-calendar'

class UserConsoleComponent extends Component {
    
    constructor(props) {
        super(props);
        this.state = { 
            room: '0',
            events: [],
            date: new Date(),
            roomList: []
        }
    }

    // Want to set-it up so that initial page load and any time this room is changed, database is queried
    // for the events for that room
    setRoom (newRoom) {
        this.setState({room : newRoom});
    }

    sendRequest(room, date) {
        console.log(room, date);
        const request = JSON.stringify(
          { 
            adminid: 1,
            date: date,
            roomid: room
        });
        axios.get('http://10.0.2.2:8000/room_mgmt/admin/events/view', request)  
        .then(function (response) {
            console.log(response);
          this.state.events = response;
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    parseTime(date) {
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hour = date.getHours();
        var minutes = date.getMinutes();
        var total = year + '-' + month + '-' + day + ' ' + hour + ':' + minutes;

        return total;
    }

    componentDidMount() {
        //console.log("Send database request to get requests")
        this.getRooms();
          
      }
      getRooms(){
        axios.get('http://10.0.2.2:8000/room_mgmt/user/rooms/')
        // fetch('http://10.0.2.2:8000/room_mgmt/user/rooms/', {
        //     method: 'GET',
        //     body: request
        // })
          .then(response => {

              let rooms = response.data.roomslist;
              let temp = [];
              for (let i = 0; i < rooms.length; i++) {
                  temp.push(rooms[i].roomnumber);
              }
              this.setState({roomList: temp})
          })
          .catch(function(error) {
              console.log(error)
          })
      }
        parseTime(date) {
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var total = year + '-' + month + '-' + day;

        return total;
    }

    render() { 
        return ( 
            <>
            <View>
                <Text style={styles.textSty3}>Room to View:</Text>
                <View style={styles.selectContainer}>
                    <RoomSelectDropdown room = {this.state.room} setRoom = {this.setRoom.bind(this)} roomList = {this.state.roomList}/>
                </View>
                <View style={styles.calendarContainer}>
                    <Calendar events={this.state.events} height={400} />
                </View>
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
      selectContainer: {
        flex:0.2
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
    calendarContainer: {
        flex:1,
        width: 300,
      },
    button: {
        margin: 10,
    },
    textSty3: {
        fontSize:15,
        fontWeight:'bold',
        color:'#474747',
    },
})

export default UserConsoleComponent;
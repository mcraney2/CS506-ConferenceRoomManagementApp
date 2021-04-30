import React, { Component } from 'react';
import { Text, TouchableOpacityBase, View,StyleSheet} from 'react-native';

import DateTimeSelector from '../components/DateTimeSelector'
import DurationDropDown from '../components/DurationDropDown'
import RoomSelectDropdown from '../components/RoomSelectDropdown'
import UserTextInput from '../components/UserTextInput'
import Button from '../components/Button'
import axios from 'axios'
import { TextInput } from 'react-native-gesture-handler';
import RepeatSelectDropdown from './RepeatSelectDropdown';

class AdminAddEvent extends Component {
    
    constructor(props) {
        super(props);
        this.state = { 
            date: new Date(),
            hours: '0',
            minutes: '0',
            room: '0',
            value: '',
            repeat:'none',
            roomList: []
        }
    }
    setDate (newDate) {
        this.setState({date:newDate});
    }

    setMinutes (newMinutes) {
        this.setState({minutes: newMinutes});
    }

    setHours (newHours) {
        this.setState({hours: newHours});
    }

    setRoom (newRoom) {
        this.setState({room : newRoom});
    }

    setValue (newValue) {
        this.setState({value: newValue});
    }

    setRepeat(newRepeat) {
        this.setState({repeat: newRepeat});
    }

    sendRequest(room, startTime, endTime, value, repeat) {
        console.log(room,startTime, endTime, value, repeat.value);
        const request = JSON.stringify(
          { 
            //userid: 1,
            //creator: creator,
            //eventname:event.value,
            eventname: value,
            roomnumber:room,
            starttime:startTime,
            endtime:endTime,
            repeat:repeat.value,

        });
        axios.post('http://10.0.2.2:8000/room_mgmt/admin/events/create/', request)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }


    createRoomList(roomslist) {
              let rooms =roomslist;
              let temp = [];
              for (let i = 0; i < rooms.length; i++) {
                  temp.push(rooms[i].roomnumber);
              }
              this.setState({roomList: temp})
    }
    componentDidMount() {
        //console.log("Send database request to get requests")
        this.getRooms();
          
      }
      getRooms(){
        axios.post('http://10.0.2.2:8000/room_mgmt/user/rooms/')
        // fetch('http://10.0.2.2:8000/room_mgmt/user/rooms/', {
        //     method: 'GET',
        //     body: request
        // })
          .then(response => {
              createRoomsList(response.data.roomslist);
          })
          .catch(function(error) {
              console.log(error)
          })
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

    render() { 
        
        //const endTime = Object.assign({}, this.state.date);
        const currentHour = this.state.date.getHours();
        const currentMinute = this.state.date.getMinutes();
        const endTime = new Date();
        endTime.setHours(currentHour, currentMinute + (60 * parseInt(this.state.hours,10)) + parseInt(this.state.minutes,10), 0, 0);
        //"starttime":"2021-10-25 14:30",
        let startDate = this.parseTime(this.state.date);
        let endDate = this.parseTime(endTime);
        let currentTime = this.parseTime(new Date());
        let creator = "test";
        //console.log(startDate, endDate, currentTime);

        return ( 
            <>
            <View>
                <Text style={styles.textSty}>Add Event To:</Text>
                <RoomSelectDropdown room = {this.state.room} setRoom = {this.setRoom.bind(this)} roomList = {this.state.roomList}/>
                <Text style={styles.textSty3}>Event Name:</Text>
                <UserTextInput placeHolder = 'Enter Event Name Here' value = {this.state.value} setValue = {this.setValue.bind(this)}/>
                <Text style={styles.textSty3}>Date and Time of Event:</Text>
                <DateTimeSelector date = {this.state.date} setDate = {this.setDate.bind(this)}/>
                <Text style={styles.textSty3}>Event Duration:</Text>
                <DurationDropDown minutes = {this.state.minutes} setMinutes = {this.setMinutes.bind(this)} hours = {this.state.hours} setHours = {this.setHours.bind(this)}/>
                <Text style={styles.textSty3}>Repeat:</Text>
                <RepeatSelectDropdown repeat = {this.state.repeat} setRepeat = {this.setRepeat.bind(this)}/>
                <Button 
                        handleClick = {() => this.sendRequest(this.state.room, startDate, endDate, this.state.value, this.state.repeat)}
                        label = "Add Event"
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
    container3: {
        flex:1,
        width:100,
    },
    container4: {
        flex:1,
        width:130,
    },
    sideBySide: {
        flex:0.3,
        margin:10,
        flexDirection:'row',
    },
    button: {
        margin: 10,
    },
    textSty: {
        fontSize:30,
        fontWeight:'bold',
        marginTop: 20,
    },
    textSty2: {
        fontSize:30,
        fontWeight:'bold',
        marginTop: 20,
        marginLeft: 10,
        color:'red',
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

export default AdminAddEvent;
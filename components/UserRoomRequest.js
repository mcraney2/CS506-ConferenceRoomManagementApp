import React, { Component } from 'react';
import { Text, TouchableOpacityBase, View,StyleSheet} from 'react-native';

import DateTimeSelector from './DateTimeSelector'
import DurationDropDown from './DurationDropDown'
import RoomSelectDropdown from './RoomSelectDropdown'
import UserTextInput from './UserTextInput'
import Button from './Button'
import axios from 'axios'
import { TextInput } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
export class UserRoomRequest extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            date: new Date(),
            hours: '0',
            minutes: '0',
            room: '0',
            reason: '',
            event: '',
            roomList: [],
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
    setReason (newReason) {
        console.log(newReason);
        this.setState({reason: newReason});
    }
    setEvent (newEvent) {
        console.log(newEvent);
        this.setState({event: newEvent});
    }
    sendRequest(room,startTime, endTime, currentTime, reason, event, groupid, userid) {
        console.log(room,startTime, endTime, currentTime, reason, event, groupid, userid);
        /// The following code is just to simulate adding a room to the database so I test my stuff
        // const addRoom = JSON.stringify(
        //     {roomnumber: room}
        // );
        // axios.post('http://10.0.2.2:8000/room_mgmt/admin/add_room/', addRoom)
        // .then(function (response) {
        //   console.log(response);
        // })
        // .catch(function (error) {
        //   console.log('oof')
        //   console.log(error);
        // });    
        //////////////////END ZACH TESTING ROOM AREA////////////////////////////
        const request = JSON.stringify(
          { 
            userid:userid,
            groupid:groupid,
            roomnumber:room,
            eventname:event,
            reason: reason,
            starttime:startTime,
            endtime:endTime,
            requesttime:currentTime,
            repeat:"none"

        });
        axios.post('http://10.0.2.2:8000/room_mgmt/user/request/', request)
        .then(function (response) {
          //console.log(response);
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
        if (parseInt(minutes, 10) < 10) {
            minutes = '0' + minutes;
        }
        var total = year + '-' + month + '-' + day + ' ' + hour + ':' + minutes;

        return total;
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
        //console.log(startDate, endDate, currentTime);
        
        return ( 
            <>
            <View>
            {/* <Button 
                    handleClick= {this.sendRequest(this.room, startDate, endDate, currentTime)}
                    label="Send Request"
                /> */}
                <Text style={styles.textSty}>Group: {this.props.userGroupCode}</Text>
                <View style={styles.margin}>
                    <RoomSelectDropdown room = {this.state.room} setRoom = {this.setRoom.bind(this)} roomList = {this.state.roomList}/>
                </View>
                <View style={styles.button}>
                    <DateTimeSelector date = {this.state.date} setDate = {this.setDate.bind(this)}/>
                </View>
                <View style={styles.margin}>
                    <DurationDropDown minutes = {this.state.minutes} setMinutes = {this.setMinutes.bind(this)} hours = {this.state.hours} setHours = {this.setHours.bind(this)}/>
                </View>
                <View style={styles.textBox}>
                    <UserTextInput placeHolder = 'Enter reason for room request'value = {this.state.reason} setValue = {this.setReason.bind(this)}/>
                </View>
                <View style={styles.textBox}>
                    <UserTextInput placeHolder = 'Enter event name'value = {this.state.event} setValue = {this.setEvent.bind(this)}/>
                </View>
                <View style={styles.button}>
                    <Button 
                        handleClick= {() => this.sendRequest(this.state.room, startDate, endDate, currentTime,this.state.reason, this.state.event, this.props.userGroupID, this.props.userid)}
                        //handleClick= {() => this.getRooms()}
                        label="Send Request"
                    />
                </View>
                {/* <Text>{this.state.reason}</Text> */}
                {/* <TextInput
                    style={styles.input}
                    value={this.state.reason}
                    onChangeText={text=>this.setState({reason:text})}
                    multiline={true}
                    underlineColorAndroid='transparent'
            /> */}
                {/* <Text>Test</Text> */}

                </View>

            </>
         );
    }
}
const styles = StyleSheet.create({
    input: {
        paddingRight: 10,
        lineHeight: 23,
        flex: 2,
        textAlignVertical: 'top'
    },
    textSty: {
      fontSize:20,
      fontWeight:'bold',
      alignItems: 'center',
      //justifyContent: 'center',
      marginBottom: 5,
      
    },
    margin: {
        marginTop: 20,
        marginBottom: 20,
        alignItems: 'center',
    },
    button: {
        //flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
    textBox: {
        alignItems: 'center',
    },
})
const mapDispatchToProps =  {
  
    

  }
  
  const mapStateToProps = (state) => {
    return {
        userGroupCode: state.groupCode.userGroupCode,
        userGroupID: state.groupID.userGroupID,
        userid: state.userID.userid
    }
  }
export default connect(mapStateToProps, mapDispatchToProps)(UserRoomRequest);
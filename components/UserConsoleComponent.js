import React, { Component } from 'react';
import { Text, TouchableOpacityBase, View,StyleSheet} from 'react-native';
import RoomSelectDropdown from '../components/RoomSelectDropdown'
import UserTextInput from '../components/UserTextInput'
import Button from '../components/Button'
import axios from 'axios'
import { TextInput } from 'react-native-gesture-handler';
import RepeatSelectDropdown from './RepeatSelectDropdown';
import { Calendar } from 'react-native-big-calendar'
import {resetUserGroup} from '../actions/GroupCodeActionCreators'
import { connect } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
console.disableYellowBox = true;



export class UserConsoleComponent extends Component {
    
    constructor(props) {
        super(props);
        this.state = { 
            room: '0',
            events: [],
            date: new Date(),
            roomList: []
        }
    }

    updateEvents (eventList)  {
        this.setState({events:eventList});
    }

    // Want to set-it up so that initial page load and any time this room is changed, database is queried
    // for the events for that room
    setRoom (newRoom) {
        this.setState({room : newRoom});
        this.getEvents(newRoom);
    }

    setEventList(datelist, roomnumber) {
        console.log("Room Num: ");
              console.log(roomnumber);
              console.log("\nDateList: ")
              console.log(datelist);
              let date_list = datelist;
              let events_temp = [];
              for(let j = 0; j < date_list.length; j++) {

                  let event_list = datelist[j].eventlist;

                  for(let k = 0; k < event_list.length; k++) {
                      let start_date = event_list[k].starttime;
                      let end_date = event_list[k].endtime;
                      let event_name = event_list[k].eventname;

                      let event = {
                          title: event_name, 
                          start: new Date(start_date), 
                          end: new Date(end_date)
                      };

                      events_temp.push(event);
                  }
              }
              
                this.updateEvents(events_temp);
                console.log("All of the Events: \n" + events_temp);
              
            
    }
    getEvents(room) {
        // Get all the events for the rooms
        let date = new Date();
        date = this.parseTime(date);
        const request = JSON.stringify(
            { 
              date: date,
              mode: "week",
              roomnumber: room,
            });
          axios.post('http://10.0.2.2:8000/room_mgmt/user/calendar/', request)  
          .then(response => {
              this.setEventList(response.data.datelist, response.data.roomnumber)
            })
          .catch(function (error) {
            console.log(error);
          });
    }

    componentDidMount() {
        //console.log("Send database request to get requests")
        this.getRooms();
          
      }
    

    createRoomList(roomslist) {
        let rooms =roomslist;
        let temp = [];
        for (let i = 0; i < rooms.length; i++) {
            temp.push(rooms[i].roomnumber);
        }
        this.setState({roomList: temp})
    }
    getRooms(){
        axios.post('http://10.0.2.2:8000/room_mgmt/user/rooms/').then(response => {
              this.createRoomList(response.data.roomslist)  
          })
          .catch(function(error) {
              console.log(error)
          })
    }

    parseTime(date) {
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        if (Number(month) < 10) {
            month = "0" + month;
        }
        var day = date.getDate();
        if (Number(day) < 10) {
            day = "0" + day;
        }
        var total = year + '-' + month + '-' + day;

        return total;
    }

    render() { 
        //const counter = useSelector(state => state)
        console.log("In UserConsoleComponent", this.props);
        return ( 
            <>
            <View>
            {/* <Text style={styles.textSty}>User Group Code: {this.props.userGroupCode}</Text> */}
            {/* <Text style={styles.textSty3}>{counter.userGroupCode}</Text>; */}
                <Text style={styles.textSty1}>Group: {this.props.userGroupCode}</Text>
                <Text style={styles.textSty3}>Room to View:</Text>
                <View style={styles.selectContainer}>
                    <RoomSelectDropdown room = {this.state.room} setRoom = {this.setRoom.bind(this)} roomList = {this.state.roomList}/>
                </View>
                <View style={styles.calendarContainer}>
                    <Calendar 
                        events={this.state.events} 
                        height={400} 
                    />
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
    textSty1: {
        fontSize:24,
        fontWeight:'bold',
        color:'#474747',
    },
})
const mapDispatchToProps =  {
  
    resetUserGroup

  }
  
  const mapStateToProps = (state) => {
    return {
        userGroupCode: state.groupCode.userGroupCode,
        userGroupID: state.groupID.userGroupID
        //state
    }
  }
//export class UserConsoleComponentTest extends Component{};
export default connect(mapStateToProps, mapDispatchToProps)(UserConsoleComponent);

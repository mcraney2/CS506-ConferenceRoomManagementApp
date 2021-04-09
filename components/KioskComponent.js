
import React, { Component } from 'react';
import {StyleSheet, Text, TouchableOpacityBase, View} from 'react-native'
import AdminRoomRequest from './AdminRoomRequest'
import { Calendar } from 'react-native-big-calendar'
import Accordion from 'react-native-collapsible/Accordion'
import axios from 'axios'
import RoomSelectDropdown from '../components/RoomSelectDropdown'

 class Kiosk extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            requests: [],
            activeSections : [],
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
        axios.post('http://10.0.2.2:8000/room_mgmt/admin/events/view', request)  
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
 parseTime(date) {
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var total = year + '-' + month + '-' + day;

        return total;
    }

    componentDidMount() {
        //console.log("Send database request to get requests")
        this.getRooms();
        this.getRequests();
          
      }
      getRooms(){
        axios.post('http://10.0.2.2:8000/room_mgmt/user/rooms/')
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
      getRequests(){
                let date = new Date().getDate();
                let month = new Date().getMonth() + 1;
                let year = new Date().getFullYear();
              const request = JSON.stringify(
                { 
                  
           Roomnumber:"1080",
              Mode:"week",
              date: year.toString() +'-'+month.toString() +'-' +date.toString()
              });
           
              
                axios.post('http://10.0.2.2:8000/room_mgmt/user/calendar')
                .then(response => {

                    let events = response.data.datelist;
                    // let temp = [];
                    // for (let i = 0; i < rooms.length; i++) {
                    //     temp.push(rooms[i].roomnumber);
                    // }
                    this.setState({events: events})
                })
                .catch(function(error) {
                    console.log(error)
                })
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
})

export default Kiosk;

//     componentDidMount() {
     
//       this.getRequests();
        
//     }
//     getRequests(){
//         let date = new Date().getDate();
//         let month = new Date().getMonth() + 1;
//         let year = new Date().getFullYear();
//       const request = JSON.stringify(
//         { 
          
//    Roomnumber:"roomnumber",
//       Mode:"week",
//       date: year.toString() +'-'+month.toString() +'-' +date.toString()
//       });
   
      
//         axios.post('http://10.0.2.2:8000/room_mgmt/user/calendar',request)
//         .then(function (response) {
//             console.log(response);
//             })
//         .catch(function(error) {
//             console.log(error)
//         })
//     }

//     render() { 
//         const events = [
//             {
//               title: 'Meeting',
//               start: new Date(2021, 4, 8, 10, 0),
//               end: new Date(2021, 4,8, 10, 30),
//             },
            
//           ]
   
//         return (  
//           <View >
//             <Text style={styles.headerText}>Room 1080</Text>
            
//             <View style={styles.calandarContainter}  >
//             <Calendar events={events} height={400} />
//                   </View>
                    
//                 </View>


            
//         );
//     }
// }
// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       flexDirection: 'row',
//       alignItems: 'center',
//       //justifyContent: 'center',
//     },
//     calendarContainer: {
//       flex:1,
//       width: 300,
//     },
//     headerText: {
//         fontSize: 22,
//         fontWeight: 'bold'
//     }
// })
//  export default Kiosk;
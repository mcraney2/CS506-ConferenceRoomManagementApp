import axios from 'axios';
import React, { Component } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Button from './Button'

class AdminRoomRequest extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    acceptRequest(id, refresh) {
        console.log("Send database 'accept' message to add to calendar and then database request to remove this from requests");
        console.log(id);
            //console.log(room,startTime, endTime, currentTime);
        const request = JSON.stringify(
              { 
                adminid:1,
                requestid: id
    
            });
        axios.post('http://10.0.2.2:8000/room_mgmt/admin/requests/process/', request)
            .then(function (response) {
              //console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            })
            .then(function() {
              refresh();
            
  
            });
        }
    
    denyRequest(id, refresh) {
        console.log("Send database 'deny' request and simply remove request");
        console.log(id);
        const request = JSON.stringify(
            { 
              adminid:1,
              requestid: id
  
          });
        axios.put('http://10.0.2.2:8000/room_mgmt/admin/requests/process/',request)
        .then(function (response) {
            //console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          })
          .then(function() {
            refresh();
          

          });
        }
    
    getDate(date) {
          
          
          var year = date.getFullYear();
          var month = date.getMonth() + 1;
          var day = date.getDate();
         
          var total = month + '/' + day + '/' + year;
          return total;
      }
    getTime(date) {
        
        
        var hour = date.getHours();
        var minutes = date.getMinutes();
        if (parseInt(minutes, 10) < 10) {
            minutes = '0' + minutes;
        }
        var total = hour + ':' + minutes;

        return total;
    }
     renderItem = ({ item }) => (
      // start = new Date(this.props.startTime);
      // end = new Date(this.props.endTime);
      // date = this.getDate(start);
      // startTime = this.getTime(start);
      // endTime = this.getTime(end);
      <View>
              <Text>Group: {item.group}</Text> 
              <Text>Event: {item.name}</Text>
              <Text>Date: {this.getDate(new Date(item.starttime))}</Text>
              <Text testID = 'startTime'>Start Time: {this.getTime(new Date(item.starttime))}</Text>
              <Text testID = 'endTime'>End Time: {this.getTime(new Date(item.endtime))}</Text>
              <Text>Reason: {item.reason}</Text>
              {/* <Text testID = 'conflicts'>Conflicts: {this.props.conflicts}</Text> */}
              <Button handleClick = {() =>this.acceptRequest(item.requestid,this.props.refresh)}
                      label = 'Accept'
                      />
              <Button handleClick = {() => this.denyRequest(item.requestid, this.props.refresh)}
                      label = 'Deny'
                      />
            </View>
    );
    render() { 
        //console.log(this.props);
        //console.log('start time', this.props.startTime);
        let start = new Date(this.props.startTime);
        let end = new Date(this.props.endTime);
        date = this.getDate(start);
        startTime = this.getTime(start);
        endTime = this.getTime(end);
        return (  
            // <View>
            //   <Text>Group: {this.props.group}</Text> 
            //   <Text>Event: {this.props.event}</Text>
            //   <Text>Date: {date}</Text>
            //   <Text testID = 'startTime'>Start Time: {startTime}</Text>
            //   <Text testID = 'endTime'>End Time: {endTime}</Text>
            //   <Text>Reason: {this.props.reason}</Text>
            //   {/* <Text testID = 'conflicts'>Conflicts: {this.props.conflicts}</Text> */}
            //   <Button handleClick = {() =>this.acceptRequest(this.props.id,this.props.refresh)}
            //           label = 'Accept'
            //           />
            //   <Button handleClick = {() => this.denyRequest(this.props.id, this.props.refresh)}
            //           label = 'Deny'
            //           />
            // </View>

            <SafeAreaView>
              <FlatList
                  data = {this.props.roomList}
                  renderItem = {this.renderItem}
                  keyExtractor = {item => item.requestid.toString()}
              />
            </SafeAreaView>
        );
    }
}
 
export default AdminRoomRequest;
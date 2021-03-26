import axios from 'axios';
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Button from './Button'

class AdminRoomRequest extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    acceptRequest(id) {
        console.log("Send database 'accept' message to add to calendar and then database request to remove this from requests");
       
            //console.log(room,startTime, endTime, currentTime);
        const request = JSON.stringify(
              { 
                adminid:1,
                requestid: id
    
            });
        axios.post('http://10.0.2.2:8000/room_mgmt/admin/requests/process/', request)
            .then(function (response) {
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            });
        }
    
    denyRequest(id) {
        console.log("Send database 'deny' request and simply remove request");
        const request = JSON.stringify(
            { 
              adminid:1,
              requestid: id
  
          });
        axios.put('http://10.0.2.2:8000/room_mgmt/admin/requests/process/',request)
        .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
        }
    
    
    render() { 
        console.log(this.props.id);
        return (  
            <View>
            <Text>Group: {this.props.group}</Text> 
            <Text>Date: {this.props.date}</Text>
            <Text>Time: {this.props.time}</Text>
            <Text>Duration: {this.props.duration}</Text>
            <Text>Conflicts: {this.props.conflicts}</Text>
            <Button handleClick = {() =>this.acceptRequest(this.props.id)}
                    label = 'Accept'
                    />
            <Button handleClick = {() => this.denyRequest(this.props.id)}
                    label = 'Deny'
                    />
            </View>
        );
    }
}
 
export default AdminRoomRequest;
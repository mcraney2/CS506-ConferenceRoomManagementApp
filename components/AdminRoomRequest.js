import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Button from './Button'

class AdminRoomRequest extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    acceptRequest (){
        console.log("Send database 'accept' message to add to calendar and then database request to remove this from requests");
        // Do the database acccept request thing
    }
    denyRequest() {
        console.log("Send database 'deny' request and simply remove request");
        // Do the database deny request thing
    }
    
    render() { 
        //console.log(this.props)
        return (  
            <View>
            <Text>Group: {this.props.group}</Text> 
            <Text>Date: {this.props.date}</Text>
            <Text>Time: {this.props.time}</Text>
            <Text>Duration: {this.props.duration}</Text>
            <Text>Conflicts: {this.props.conflicts}</Text>
            <Button handleClick = {this.acceptRequest}
                    label = 'Accept'
                    />
            <Button handleClick = {this.denyRequest}
                    label = 'Deny'
                    />
            </View>
        );
    }
}
 
export default AdminRoomRequest;
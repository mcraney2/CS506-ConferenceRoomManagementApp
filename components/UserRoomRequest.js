import React, { Component } from 'react';
import { Text, TouchableOpacityBase, View } from 'react-native';

import DateTimeSelector from './DateTimeSelector'
import DurationDropDown from './DurationDropDown'
class UserRoomRequest extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            date: new Date(1598051730000),
            hours: '0',
            minutes: '0',
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
    render() { 
        console.log(this.state.date);
        return ( 
            <>
            <View>
                <DateTimeSelector date = {this.state.date} setDate = {this.setDate.bind(this)}/>
                <DurationDropDown minutes = {this.state.minutes} setMinutes = {this.setMinutes.bind(this)} hours = {this.state.hours} setHours = {this.setHours.bind(this)}/>
                <Text>Current Date: {this.state.date.getMonth()+1}/{this.state.date.getDate()}/{this.state.date.getFullYear()}</Text>
                <Text>Time: {this.state.date.getHours()}:{this.state.date.getMinutes()}</Text>
                <Text>Duration: {this.state.hours} hours and {this.state.minutes} minutes</Text>
                <Text></Text>
                </View>

            </>
         );
    }
}
 
export default UserRoomRequest;
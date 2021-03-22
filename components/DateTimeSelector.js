import React, {Component} from 'react';
import {View, Platform, Text} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Button from './Button'
class DateTimeSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            //date: new Date(1598051730000),
            mode: 'date',
            show: false
        }
    }

    onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        this.setState({show: Platform.OS === 'ios'});
        //this.setState({date: currentDate});
        this.props.setDate(currentDate);
      };
    showMode = (currentMode) => {
        this.setState({show:true});
        this.setState({mode: currentMode});
      };
    
    showDatepicker = () => {
        this.showMode('date');
      };
    
    showTimepicker = () => {
        this.showMode('time');
      };
    render() { 
        //console.log(this.props.date);
        return (  
            <View>
                <View>
                    
                    <Button handleClick={this.showDatepicker} label="Select Date" />
                    <Text>Current Date: {this.props.date.getMonth()+1}/{this.props.date.getDate()}/{this.props.date.getFullYear()}</Text>
                </View>
                <View>
                    <Button handleClick={this.showTimepicker} label="Select Time" />
                    <Text>Time: {this.props.date.getHours()}:{this.props.date.getMinutes()}</Text>
                </View>
                {this.state.show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={this.props.date}
                        mode={this.state.mode}
                        is24Hour={true}
                        display="default"
                        onChange={this.onChange}
                    />
      )}
    </View>
        );
    }
}
 
export default DateTimeSelector;


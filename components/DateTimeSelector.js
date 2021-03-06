import React, {Component} from 'react';
import {View, Platform, Text, StyleSheet} from 'react-native';
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
    getDate(date) {
      if (date ===undefined || date.getTime() !== date.getTime()) {
        return ''
      }  
          
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        if (parseInt(month, 10) < 10) {
          month = '0' + month;
        }
        var day = date.getDate();
        if (parseInt(day, 10) < 10) {
          day = '0' + day;
        }
       
        var total = month + '/' + day + '/' + year;
        return total;
    }
  getTime(date) {
      
      if (date === undefined || date.getTime() !== date.getTime()) {
        return ''
      }
      var hour = date.getHours();
      if (parseInt(hour, 10) < 10) {
        hour = '0' + hour;
      }
      var minutes = date.getMinutes();
      if (parseInt(minutes, 10) < 10) {
          minutes = '0' + minutes;
      }
      var total = hour + ':' + minutes;

      return total;
  }
    render() { 
        
        return (  
            <View>
                <View style={styles.margin}>
                    
                    <Button handleClick={this.showDatepicker} label="Select Date" />
                    <Text style={styles.textSty}>Current Date: {this.getDate(this.props.date)}</Text>
                </View>
                <View>
                    <Button handleClick={this.showTimepicker} label="Select Time" />
                    <Text style={styles.textSty}>Time: {this.getTime(this.props.date)}</Text>
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

const styles = StyleSheet.create({
    margin: {
        marginBottom: 10,
    },
    textSty: {
      fontSize:15,
      alignItems: 'center',
      //justifyContent: 'center',
      marginBottom: 10,
      
    },
})
 
export default DateTimeSelector;


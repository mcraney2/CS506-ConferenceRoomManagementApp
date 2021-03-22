//import DropDownPicker from 'react-native-dropdown-picker';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Picker} from '@react-native-picker/picker';

class DurationDropDown extends Component {
    constructor(props) {
        super(props);
        this.state = {  
        
        }
    }
    render() { 
        return (  
            <>
                <View style = {styles.container}>
                
                    <Picker
                        selectedValue = {this.props.hours}
                        onValueChange = {this.props.setHours}
                        style={{ height: 25, width: 150 }}
                        >
                            <Picker.Item label = '0 hours' value = '0' />
                            <Picker.Item label = '1 hour' value = '1' />
                            <Picker.Item label = '2 hours' value = '2' />
                            <Picker.Item label = '3 hours' value = '3' />
                        </Picker>
                    <Picker
                        selectedValue = {this.props.minutes}
                        onValueChange = {this.props.setMinutes}
                        style={{ height: 25, width: 150 }}
                        >
                            <Picker.Item label = '0 minutes' value = '0' />
                            <Picker.Item label = '15 minutes' value = '15' />
                            <Picker.Item label = '30 minutes' value = '30' />
                            <Picker.Item label = '45 minutes' value = '45' />
                            </Picker>
                    </View>

</>
        );
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      //justifyContent: 'center',
    },
    headerText: {
        fontSize: 22,
        fontWeight: 'bold'
    }
})
export default DurationDropDown;

{/* <DropDownPicker
                items={[
                    {label: '0 hours', value: '0'},
                    {label: '1 hour', value: '1' },
                    {label: '2 hours', value: '2'},
                    {label: '3 hours', value: '3'},
                    {label: '4 hours', value: '4'}
                ]}
            defaultValue={this.props.hours}
            containerStyle={{height: 40}}
            style={{backgroundColor: '#fafafa'}}
            itemStyle={{
                justifyContent: 'flex-start'
            }}
            dropDownStyle={{backgroundColor: '#fafafa'}}
            onChangeItem={item => this.props.setHours(item.value)}
/>
<DropDownPicker
                items={[
                    {label: '0 minutes', value: '0'},
                    {label: '15 minutes', value: '15' },
                    {label: '30 minutes', value: '30'},
                    {label: '45 minutes', value: '45'},
                ]}
            defaultValue= {this.props.minutes}
            containerStyle={{height: 40}}
            style={{backgroundColor: '#fafafa', flexDirection: 'column-reverse'}}
            itemStyle={{
                justifyContent: 'flex-start'
            }}
            placeholder = {'Test'}
            placeholderStyle={{
                fontWeight: 'bold',
                textAlign: 'center'
            }}
            dropDownStyle={{backgroundColor: '#fafafa'}}
            onChangeItem={item => this.props.setMinutes(item.value)}
/> */}
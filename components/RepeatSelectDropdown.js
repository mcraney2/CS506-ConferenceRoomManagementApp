//import DropDownPicker from 'react-native-dropdown-picker';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Picker} from '@react-native-picker/picker';

class RepeatSelectDropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            options : ['None','Weekly', 'Monthly']
        }
    }
    optionsList = () => {
        return( this.state.options.map( (x,i) => { 
            return( <Picker.Item label={x} key={i} value={x}  />)} ));
    }
    
    render() { 
        
        return (  
            <>
                <View style = {styles.container}>
                
                    <Picker
                        selectedValue = {this.props.repeat}
                        onValueChange = {this.props.setRepeat}
                        style={{ height: 25, width: 150 }}
                        >
                            {this.optionsList()}
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

export default RepeatSelectDropdown;
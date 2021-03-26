//import DropDownPicker from 'react-native-dropdown-picker';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Picker} from '@react-native-picker/picker';

class RoomSelectDropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            rooms : ['1080','1100', '1220', '1070' ]
        }
    }
    roomsList = () => {
        return( this.state.rooms.map( (x,i) => { 
            return( <Picker.Item label={x} key={i} value={x}  />)} ));
  }
    
    render() { 
        
        return (  
            <>
                <View style = {styles.container}>
                
                    <Picker
                        selectedValue = {this.props.room}
                        onValueChange = {this.props.setRoom}
                        style={{ height: 25, width: 150 }}
                        >
                            {this.roomsList()}
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
export default RoomSelectDropdown;


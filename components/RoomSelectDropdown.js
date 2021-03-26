  
//import DropDownPicker from 'react-native-dropdown-picker';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';

class RoomSelectDropdown extends Component {
    constructor(props) {
        super(props);

    }
    roomsList = () => {
        return( this.props.roomList.map( (x,i) => { 
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
                        testID = 'Room'
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

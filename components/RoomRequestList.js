
import React, { Component } from 'react';
import {StyleSheet, Text, TouchableOpacityBase, View} from 'react-native'
import AdminRoomRequest from './AdminRoomRequest'
import jsonData from '../dummy-data'
import Accordion from 'react-native-collapsible/Accordion'
import axios from 'axios'

const DATA = jsonData.requests.map(function(item) {
    return {
      room: item.room,
      group: item.group,
      date: item.date,
      time: item.time,
      duration: item.duration,
      id: item.id,
      conflicts :item.conflicts
    }; 
  
  })
class RoomRequestList extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            requests: [],
            activeSections : []
        }
    }
    componentDidMount() {
        //this.getRequests();
        console.log("Send database request to get requests")
    }
    getRequests = () => {
        axios.get()
        .then(response => {
            this.setState({requests: response.data})
        })
        .catch(function(error) {
            console.log(error)
        })
    }

       _renderHeader = section => {
        return (
          <View style={styles.header}>
            <Text style={styles.headerText}>Room: {section.room}</Text>
          </View>
        );
      };
      _renderContent = section => {
        return (
          <View style={styles.content}>
            <AdminRoomRequest group = {section.group} date = {section.date} time = {section.time} duration = {section.duration} conflicts = {section.conflicts}/>
          </View>
        );
      };
      _updateSections = activeSections => {
        this.setState({ activeSections });
      };
    render() { 
      console.log(DATA)
        return (  
            <>
    
                    <Accordion
                        sections={DATA}
                        activeSections={this.state.activeSections}
                        //renderSectionTitle={this._renderSectionTitle}
                        renderHeader={this._renderHeader}
                        renderContent={this._renderContent}
                        onChange={this._updateSections}
                     />
                


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
export default RoomRequestList;
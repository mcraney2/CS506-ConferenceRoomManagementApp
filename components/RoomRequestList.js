
import React, { Component } from 'react';
import {StyleSheet, Text, TouchableOpacityBase, View} from 'react-native'
import AdminRoomRequest from './AdminRoomRequest'
import jsonData from '../dummy-data'
import Accordion from 'react-native-collapsible/Accordion'
import axios from 'axios'


class RoomRequestList extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            requests: [],
            activeSections : []
        }
    }
    componentDidMount() {
      //console.log("Send database request to get requests")
      this.getRequests();
        
    }
    getRequests(){
      //console.log('Get requests');
      const request = JSON.stringify(
        { 
          adminid:1,
          groupid: 1

      });
        axios.get('http://10.0.2.2:8000/room_mgmt/admin/requests/view/')
        .then(response => {
            this.setState({requests: response.data.requestlist})
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
            {/* <AdminRoomRequest room = {section.room} startTime = {section.starttime} endTime = {section.endtime} group = {section.group} event = {section.name} reason = {section.reason} id = {section.requestid} refresh = {this.getRequests.bind(this)}/> */}
            <AdminRoomRequest roomList = {section.requests} refresh = {this.getRequests.bind(this)}/>
          </View>
        );
      };
      _updateSections = activeSections => {
        this.setState({ activeSections });
      };



      //  format Array[
      //   Object {
      //     room: X
      //     requests: []
      //   }
      // ]
      createArray(requests) {
        let arr = [];
        for (let i = 0; i < requests.length; i++) {
          let room = requests[i].room;
          let pushed = false;
          for (let j = 0; j < arr.length; j++) {
            if (arr[j].room === room) {
              arr[j].requests.push(requests[i]);
              pushed = true;
            }
          }
          if (!pushed) {
            arr.push({room : room, requests:[requests[i]]})
          }
        }
        
        return arr;
      }
    render() { 
      //console.log(DATA);
      //console.log(this.state.requests);
      let array = this.createArray(this.state.requests);
        return (  
            
                    // <Accordion
                    //     sections={this.state.requests}
                    //     activeSections={this.state.activeSections}
                    //     //renderSectionTitle={this._renderSectionTitle}
                    //     renderHeader={this._renderHeader}
                    //     renderContent={this._renderContent}
                    //     onChange={this._updateSections}
                    //  />
                    <Accordion
                    sections={array}
                    activeSections={this.state.activeSections}
                    //renderSectionTitle={this._renderSectionTitle}
                    renderHeader={this._renderHeader}
                    renderContent={this._renderContent}
                    onChange={this._updateSections}
                 />
                


            
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
import React from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import AdminRoomRequest from '../components/AdminRoomRequest'
import AddRooms from '../components/AddRooms';
import {UserRoomRequest} from '../components/UserRoomRequest'
import AdminAddEvent from '../components/AdminAddEvent';


function getRequests(){

    console.log('wow');
  }
//jest.mock("axios");

Enzyme.configure({adapter: new Adapter()})
var mock = new MockAdapter(axios);
describe('AdminRoomRequest', () => {
    it('calls the database', done => {
        const test = shallow(<AdminRoomRequest/>);
        const instance = test.instance();
        
        adminid = 1;
        requestid = 2;
        const request = JSON.stringify(
            { 
              adminid:1,
              requestid: requestid
  
          });
        mock.onPost('http://10.0.2.2:8000/room_mgmt/admin/requests/process/', request);

        instance.acceptRequest(2, {getRequests});
        instance.denyRequest(2, {getRequests});
        done();
    });
});

describe('AddRoom', () => {
    it('calls the database', done => {
        const test = shallow(<AddRooms/>);
        const instance = test.instance();
        
        const request = JSON.stringify(
            { 
                roomnumber: 1
  
          });
        mock.onPost('http://10.0.2.2:8000/room_mgmt/admin/add_room/', request);

        instance.sendRequest(2);
        done();
    });
});

describe('Get rooms from userromrequest', () => {
    it('calls the database', done => {
        const test = shallow(<UserRoomRequest/>);
        const instance = test.instance();
        
        const request = JSON.stringify(
            { 
                roomnumber: 1
  
          });

        mock.onPost('http://10.0.2.2:8000/room_mgmt/user/rooms/').reply(200, request);

        instance.getRooms();
        done();
    });
});


describe('Get rooms from userromrequest', () => {
    it('calls the database', done => {
        const test = shallow(<UserRoomRequest/>);
        const instance = test.instance();
        const request = {roomslist:
                        [{roomnumber:1, roomid:1}]};
 
        mock.onPost('http://10.0.2.2:8000/room_mgmt/user/rooms/').reply(200, request);
        instance.getRooms();
        done();
    });
});

describe('Send user Requeest', () => {
    it('calls the database', done => {
        const test = shallow(<UserRoomRequest/>);
        const instance = test.instance();
        const request = {};
 
        mock.onPost('http://10.0.2.2:8000/room_mgmt/user/rooms/').reply(200, request);
        instance.sendRequest(1,2,3,4,5,6,7,8);
        done();
    });
});
describe('Admin add request', () => {
    it('calls the database', done => {
        const test = shallow(<AdminAddEvent/>);
        const instance = test.instance();
        const request = {roomslist:
                        [{roomnumber:1, roomid:1}]};
 
        mock.onPost('http://10.0.2.2:8000/room_mgmt/admin/events/create/').reply(200, request);
        instance.sendRequest(1,2,3,4,5);
        done();
    });
});
import React from 'react';
import renderer from 'react-test-renderer';
import  DurationDropDown  from '../components/DurationDropDown';
import { fireEvent, render } from '@testing-library/react-native';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import UserRoomRequest from '../components/UserRoomRequest';
import RoomSelectDropdown  from '../components/RoomSelectDropdown';
import UserTextInput from '../components/UserTextInput';

import {setMinutes} from '../components/UserRoomRequest'
//import UserConsoleComponent from '../components/UserConsoleComponent';
import {UserConsoleComponent} from '../components/UserConsoleComponent';
import {UserConsoleComponentTest} from '../components/UserConsoleComponent';
//import configureMockStore from 'redux-mock-store';
//import { render, fireEvent, screen } from './test-utils'

import store from '../store/configureStore'
import { Provider } from 'react-redux';
import {storeFactory} from './test-utils'
import {mount} from 'enzyme'
test('Renders UserConsoleComponent snapshot as expected', () => {
    const tree = renderer.create(<UserConsoleComponent/>).toJSON();
    expect(tree).toMatchSnapshot();
});

test('Rooms dropdown sends room number to handler', () => {
    const onEventMock = jest.fn();
    const { getByTestId} = render(
        <RoomSelectDropdown setRoom = {onEventMock} roomList = {['1080', '1100', '1220', '1070']} />
    );
    fireEvent(getByTestId('Room'), 'onValueChange', '1080');
    expect(onEventMock).toHaveBeenCalledWith('1080');
    fireEvent(getByTestId('Room'), 'onValueChange', '1100');
    expect(onEventMock).toHaveBeenCalledWith('1100');
    fireEvent(getByTestId('Room'), 'onValueChange', '1220');
    expect(onEventMock).toHaveBeenCalledWith('1220');
    fireEvent(getByTestId('Room'), 'onValueChange', '1070');
    expect(onEventMock).toHaveBeenCalledWith('1070');    
});

const setup = (initialState={}) => {
    const store = storeFactory(initialState)
    const wrapper = mount(<Provider store={store}><UserConsoleComponent /></Provider>)
    console.log(wrapper.debug())
  }

test('Room handler sets the state of the room', () => {
    Enzyme.configure({adapter: new Adapter()})
        const test = shallow(<UserConsoleComponent/>);
        const instance = test.instance();
      instance.setRoom('2000');
      expect(test.state('room')).toBe('2000');
});
test('Set Event List', () => {
    Enzyme.configure({adapter: new Adapter()})
    const test = shallow(<UserConsoleComponent/>);
    const instance = test.instance();

    datelist = [
        {eventlist: [{
            starttime: '4',
            endtime: '5',
            eventname:'test'
        }]}

    ]
      instance.setEventList(datelist, '5');
});

test('parseTime', () => {
    Enzyme.configure({adapter: new Adapter()})
    const test = shallow(<UserConsoleComponent/>);
    const instance = test.instance();
    date = new Date(2021, 4, 7,4,30,25,0);
    answer = instance.parseTime(date);
    expect(answer === '2021-5-7 4:30');

})

test('Create Room List', () => {
    Enzyme.configure({adapter: new Adapter()})
    const test = shallow(<UserConsoleComponent/>);
    const instance = test.instance();
    list = [{roomnumber: 5}, {roomnumber: 4}, {roomnumber: 3}]
    answer = [5,4,3]
    instance.createRoomList(list);
    expect(test.state('roomList')).toStrictEqual(answer);
});


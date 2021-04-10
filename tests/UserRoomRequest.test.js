import React from 'react';
import renderer from 'react-test-renderer';
import  DurationDropDown  from '../components/DurationDropDown';
import { fireEvent, render } from '@testing-library/react-native';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
//import UserRoomRequest  from '../components/UserRoomRequest';
import RoomSelectDropdown from '../components/RoomSelectDropdown';
import UserTextInput from '../components/UserTextInput';
import { RequestRoomUser} from '../screens/RequestRoomUser';
import {setMinutes} from '../components/UserRoomRequest'
import { connect } from 'react-redux';

import {UserRoomRequest} from '../components/UserRoomRequest'
// test('Renders snapshot as expected', () => {
//     const tree = renderer.create(<UserRoomRequest />).toJSON();
//     expect(tree).toMatchSnapshot();
// });

test('Minutes dropdown sends minutes to handler', () => {
    const onEventMock = jest.fn();
    const { getByTestId} = render(
      <DurationDropDown setMinutes = {onEventMock}/>
    );
    fireEvent(getByTestId('Minutes'), 'onValueChange', '0');
    expect(onEventMock).toHaveBeenCalledWith('0');
    fireEvent(getByTestId('Minutes'), 'onValueChange', '15');
    expect(onEventMock).toHaveBeenCalledWith('15');
    fireEvent(getByTestId('Minutes'), 'onValueChange', '30');
    expect(onEventMock).toHaveBeenCalledWith('30');
    fireEvent(getByTestId('Minutes'), 'onValueChange', '45');
    expect(onEventMock).toHaveBeenCalledWith('45');

});

test('Hours dropdown sends hours to handler', () => {
    const onEventMock = jest.fn();
    const { getByTestId} = render(
      <DurationDropDown setHours = {onEventMock}/>
    );
    fireEvent(getByTestId('Hours'), 'onValueChange', '0');
    expect(onEventMock).toHaveBeenCalledWith('0');
    fireEvent(getByTestId('Hours'), 'onValueChange', '1');
    expect(onEventMock).toHaveBeenCalledWith('1');
    fireEvent(getByTestId('Hours'), 'onValueChange', '2');
    expect(onEventMock).toHaveBeenCalledWith('2');
    fireEvent(getByTestId('Hours'), 'onValueChange', '3');
    expect(onEventMock).toHaveBeenCalledWith('3');

});

// I don't grab rooms from database, need to mock this dependency at some point in this test
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

//<UserTextInput placeHolder = 'Enter event name'value = {this.state.event} setValue = {this.setEvent.bind(this)}/>

test('Event textbox sends event name to event handler,', () => {
    const onEventMock = jest.fn();
    const {getByTestId} = render(
        <UserTextInput placeHolder = '' setValue = {onEventMock}/>
    );
    const answer1 = "Birthday party"
    fireEvent(getByTestId('text'), 'onChangeText', 'Birthday party');
    expect(onEventMock).toHaveBeenCalledWith(answer1);

    
});

test('Reason textbox sends reason to event handler,', () => {
    const onEventMock = jest.fn();
    const {getByTestId} = render(
        <UserTextInput placeHolder = '' setValue = {onEventMock}/>
    );
    const answer1 = "Fun time"
    fireEvent(getByTestId('text'), 'onChangeText', 'Fun time');
    expect(onEventMock).toHaveBeenCalledWith(answer1);

    
});

// it('handleNameInput', () => {
//     let wrapper = shallow(<MyComponent/>);
//     wrapper.instance().searchDish = jest.fn();
//     wrapper.update();
//     wrapper.instance().handleNameInput('BoB');
//     expect(wrapper.instance().searchDish).toBeCalledWith('BoB');
//  })

test('Minute handler sets the state of the minutes duration', () => {
    Enzyme.configure({adapter: new Adapter()})
    const test = shallow(<UserRoomRequest/>);
    const instance = test.instance();
    instance.setMinutes('15');
    expect(test.state('minutes')).toBe('15');
});

test('Hour handler sets the state of the hour duration', () => {
    Enzyme.configure({adapter: new Adapter()})
    const test = shallow(<UserRoomRequest/>);
    const instance = test.instance();
    instance.setHours('2');
    expect(test.state('hours')).toBe('2');
});

test('Room handler sets the state of the room', () => {
    Enzyme.configure({adapter: new Adapter()})
    const test = shallow(<UserRoomRequest/>);
    const instance = test.instance();
    instance.setRoom('2000');
    expect(test.state('room')).toBe('2000');
});

test('Reason handler sets the state of the reason', () => {
    Enzyme.configure({adapter: new Adapter()})
    const test = shallow(<UserRoomRequest/>);
    const instance = test.instance();
    instance.setReason('I need a room to have fun with friends');
    expect(test.state('reason')).toBe('I need a room to have fun with friends');
});

test('Event handler sets the state of the event', () => {
    Enzyme.configure({adapter: new Adapter()})
    const test = shallow(<UserRoomRequest/>);
    const instance = test.instance();
    instance.setEvent('Fun time');
    expect(test.state('event')).toBe('Fun time');
});

test('All states are initialized correctly', () => {
    Enzyme.configure({adapter: new Adapter()})
    const test = shallow(<UserRoomRequest/>);
    expect(test.state('minutes')).toBe('0');
    expect(test.state('hours')).toBe('0');
    expect(test.state('room')).toBe('0');
    expect(test.state('reason')).toBe('');
    expect(test.state('event')).toBe('');
    // I dont test date here since Date just gets the current date
  });

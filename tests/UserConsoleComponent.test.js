import React from 'react';
import renderer from 'react-test-renderer';
import  DurationDropDown  from '../components/DurationDropDown';
import { fireEvent, render } from '@testing-library/react-native';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import UserRoomRequest from '../components/UserRoomRequest';
import RoomSelectDropdown from '../components/RoomSelectDropdown';
import UserTextInput from '../components/UserTextInput';
import { RequestRoomUser} from '../screens/RequestRoomUser';
import {setMinutes} from '../components/UserRoomRequest'
import UserConsoleComponent from '../components/UserConsoleComponent';

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


test('Room handler sets the state of the room', () => {
    Enzyme.configure({adapter: new Adapter()})
    const test = shallow(<UserConsoleComponent/>);
    const instance = test.instance();
    instance.setRoom('2000');
    expect(test.state('room')).toBe('2000');
});
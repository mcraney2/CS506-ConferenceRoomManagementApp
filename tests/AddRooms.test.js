import React from 'react';
import renderer from 'react-test-renderer';
import { fireEvent, render } from '@testing-library/react-native';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AddRoom from '../components/AddRooms';
import { TextInput } from 'react-native-gesture-handler';
import UserTextInput from '../components/UserTextInput';
import Button from '../components/Button';


test('Renders AddRoom snapshot as expected', () => {
    const tree = renderer.create(<AddRoom/>).toJSON();
    expect(tree).toMatchSnapshot();
});

test('Room test input sends room number to handler', () => {
    const onEventMock = jest.fn();
    const {getByPlaceholderText} = render(
      <UserTextInput setValue = {onEventMock} placeHolder = 'Enter Room Number'/>
    );
    fireEvent(getByPlaceholderText('Enter Room Number'), 'onChangeText','123');
    expect(onEventMock).toHaveBeenCalledWith('123');
});

test('Button sets state of room number', () => {
    Enzyme.configure({adapter: new Adapter()})
    const test = shallow(<AddRoom/>);
    const instance = test.instance();
    instance.setRoomNum('1234')
    expect(test.state('roomNum')).toBe('1234');
});


import React from 'react';
import renderer from 'react-test-renderer';
import { fireEvent, render } from '@testing-library/react-native';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AdminRoomRequest from '../components/AdminRoomRequest'
import RoomRequestList from '../components/RoomRequestList'
test('Renders AdminRoomRequest snapshot as expected', () => {
    const tree = renderer.create(<AdminRoomRequest/>).toJSON();
    expect(tree).toMatchSnapshot();
});
test('Renders RoomRequestList snapshot as expected', () => {
    const tree = renderer.create(<RoomRequestList/>).toJSON();
    expect(tree).toMatchSnapshot();
});

test('Converts a Date object to MM/DD/YYYY format', () => {
    Enzyme.configure({adapter: new Adapter()})
    const test = shallow(<AdminRoomRequest/>);
    const instance = test.instance();
    let date = new Date(2017, 7, 28, 5, 23, 15, 0);
    answer = instance.getDate(date);
    expect(answer).toBe('08/28/2017');
    let date2 = new Date(2016, 1, 2, 5, 23, 15, 0);
    answer = instance.getDate(date2);
    expect(answer).toBe('02/02/2016');
})

test('Converts a Date object to HH:MM format', () => {
    Enzyme.configure({adapter: new Adapter()})
    const test = shallow(<AdminRoomRequest/>);
    const instance = test.instance();
    let date = new Date(2017, 7, 28, 5, 23, 15, 0);
    answer = instance.getTime(date);
    expect(answer).toBe('05:23');
    let date2 = new Date(2016, 1, 2, 16, 0, 15, 0);
    answer = instance.getTime(date2);
    expect(answer).toBe('16:00');
})

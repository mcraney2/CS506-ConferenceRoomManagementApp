import React from 'react';
import renderer from 'react-test-renderer';
import  DurationDropDown  from '../components/DurationDropDown';
import { fireEvent, render } from '@testing-library/react-native';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import LogInComponent from '../components/LogInComponent'
import { TestScheduler } from '@jest/core';
import UserTextInput from '../components/UserTextInput';


test('Renders LogInComponent snapshot as expected', () => {
    const tree = renderer.create(<LogInComponent/>).toJSON();
    expect(tree).toMatchSnapshot();
});



test('Username text input sends username text to event handler', () => {
    const onEventMock = jest.fn();
    const {getByTestId} = render(
        <UserTextInput placeHolder = '' setValue = {onEventMock}/>
    );
    const answer1 = "user1"
    fireEvent(getByTestId('text'), 'onChangeText', 'user1');
    expect(onEventMock).toHaveBeenCalledWith(answer1);
});

test('Password text input sends password text to event handler', () => {
    const onEventMock = jest.fn();
    const {getByTestId} = render(
        <UserTextInput placeHolder = '' setValue = {onEventMock}/>
    );
    const answer1 = "password123"
    fireEvent(getByTestId('text'), 'onChangeText', 'password123');
    expect(onEventMock).toHaveBeenCalledWith(answer1);
});

test('Username handler sets the state of username', () => {
    Enzyme.configure({adapter: new Adapter()})
    const test = shallow(<LogInComponent/>);
    const instance = test.instance();
    instance.setUsername('user1');
    expect(test.state('username')).toBe('user1');
});

test('Password handler sets the state of password', () => {
    Enzyme.configure({adapter: new Adapter()})
    const test = shallow(<LogInComponent/>);
    const instance = test.instance();
    instance.setPassword('password123');
    expect(test.state('password')).toBe('password123');
});
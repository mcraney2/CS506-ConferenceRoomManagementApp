import React from 'react';
import renderer from 'react-test-renderer';
import  DurationDropDown  from '../components/DurationDropDown';
import { fireEvent, render } from '@testing-library/react-native';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AdminAddEvent from '../components/AdminAddEvent';
import RoomSelectDropdown from '../components/RoomSelectDropdown';
import UserTextInput from '../components/UserTextInput';
import {setMinutes} from '../components/AdminAddEvent'
import RepeatSelectDropdown from '../components/RepeatSelectDropdown';

import DateTimeSelector from '../components/DateTimeSelector'

test('Renders DateTimeSelector snapshot as expected', () => {
    const tree = renderer.create(<DateTimeSelector/>).toJSON();
    expect(tree).toMatchSnapshot();
});

test('getTime returns correctly formatted minute time', () => {
    Enzyme.configure({adapter: new Adapter()})
    const test = shallow(<DateTimeSelector/>);
    const instance = test.instance();
    const testDate = new Date(2018, 11, 24, 10, 33, 30, 0);
    let result = instance.getTime(testDate);
    expect(result).toBe('10:33');

    const testDate1 = new Date(2018,11, 24, 9, 33, 30, 0);
    let result1 = instance.getTime(testDate1);
    expect(result1).toBe('09:33');

    const testDate2 = new Date(2018,11, 24, 9, 8, 30, 0);
    let result2 = instance.getTime(testDate2);
    expect(result2).toBe('09:08');

    const deadDate = undefined;
    let result3 = instance.getTime(deadDate);
    expect(result3).toBe('');
    
});

test('getDate returns correctly formatted minute time', () => {
    Enzyme.configure({adapter: new Adapter()})
    const test = shallow(<DateTimeSelector/>);
    const instance = test.instance();
    const testDate = new Date(2018, 10, 24, 10, 33, 30, 0);
    let result = instance.getDate(testDate);
    expect(result).toBe('11/24/2018');

    const testDate1 = new Date(2018,8, 24, 9, 33, 30, 0);
    let result1 = instance.getDate(testDate1);
    expect(result1).toBe('09/24/2018');

    const testDate2 = new Date(2018,8, 4, 9, 8, 30, 0);
    let result2 = instance.getDate(testDate2);
    expect(result2).toBe('09/04/2018');

    const deadDate = undefined;
    let result3 = instance.getDate(deadDate);
    expect(result3).toBe('');
    
});

test('All states are initialized correctly', () => {
    Enzyme.configure({adapter: new Adapter()})
    const test = shallow(<DateTimeSelector/>);
    expect(test.state('mode')).toBe('date');
    expect(test.state('show')).toBe(false);
    

  });
  test('Show Mode changes state of show and mode', () => {
    const functionMock = jest.fn();
    Enzyme.configure({adapter: new Adapter()})
    const test = shallow(<DateTimeSelector/>);
    test.showMode = functionMock;
    test.showMode('time');


  });

  test('OnChange changes state of show and mode', () => {
    const functionMock = jest.fn();
    Enzyme.configure({adapter: new Adapter()})
    const test = shallow(<DateTimeSelector/>);
    const testDate2 = new Date(2018,8, 4, 9, 8, 30, 0);
    test.onChange = functionMock;
    test.onChange(testDate2);


  });

  
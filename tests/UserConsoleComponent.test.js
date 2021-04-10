import React from 'react';
import renderer from 'react-test-renderer';
import  DurationDropDown  from '../components/DurationDropDown';
import { fireEvent, render } from '@testing-library/react-native';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import UserRoomRequest from '../components/UserRoomRequest';
import RoomSelectDropdown  from '../components/RoomSelectDropdown';
import UserTextInput from '../components/UserTextInput';
import { RequestRoomUser} from '../screens/RequestRoomUser';
import {setMinutes} from '../components/UserRoomRequest'
//import UserConsoleComponent from '../components/UserConsoleComponent';
import {UserConsoleComponent} from '../components/UserConsoleComponent';
import {UserConsoleComponentTest} from '../components/UserConsoleComponent';
import configureMockStore from 'redux-mock-store';
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
    //const mockStore = configureMockStore({});
    // const initialState = {
    //                             userGroupCode: { groupCode:{ userGroupCode: 'yahoo'}}};
        //store = mockStore(initialState.userGroupCode.groupCode.userGroupCode);
        
        //setup()
    //     const component = (
    //         <Provider store={store}>
    //           <UserConsoleComponentTest />
    //         </Provider>
    //       );
        const test = shallow(<UserConsoleComponent/>);
        const instance = test.instance();
 

    // // const instance = test.instance();
    // // console.log("Hello");
    // // console.log(test.debug()); 
      instance.setRoom('2000');
      expect(test.state('room')).toBe('2000');
});


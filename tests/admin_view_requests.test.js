import React from 'react';
import renderer from 'react-test-renderer';
import { fireEvent, render } from '@testing-library/react-native';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AdminRoomRequest from '../components/AdminRoomRequest'
import RoomRequestList from '../components/RoomRequestList'
test('Renders Admin Room Request snapshot as expected', () => {
    const tree = renderer.create(<AdminRoomRequest/>).toJSON();
    expect(tree).toMatchSnapshot();
});
test('Renders Room Request List snapshot as expected', () => {
    const tree = renderer.create(<RoomRequestList/>).toJSON();
    expect(tree).toMatchSnapshot();
});


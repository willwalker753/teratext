import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import User from '../components/User';

configure({ adapter: new Adapter() });

describe('<User />', () => {
    it('renders user component', () => {
        const wrapper = shallow(<User />);
        wrapper.setState({ loggedIn: true });
        expect(wrapper.find('#userSpaceTop').length).toEqual(1);
    });
    it('renders list of friends', () => {
        const wrapper = shallow(<User />);
        wrapper.setState({ loggedIn: true });
        expect(wrapper.find('#userAddFriendHereBox').length).toEqual(1);
    });
});
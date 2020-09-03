import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Friend from '../components/Friend';

configure({ adapter: new Adapter() });

describe('<Friend />', () => {
    it('renders friend component', () => {
        const wrapper = shallow(<Friend />);
        wrapper.setState({ loggedIn: true });
        expect(wrapper.find('#friendUsernameCodeInfo').length).toEqual(1);
    });
    it('renders add friend form', () => {
        const wrapper = shallow(<Friend />);
        wrapper.setState({ loggedIn: true });
        expect(wrapper.find('#friendUsernameForm').length).toEqual(1);
    });
});
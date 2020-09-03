import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Account from '../components/Account';

configure({ adapter: new Adapter() });

describe('<Account />', () => {
    it('renders account component', () => {
        const wrapper = shallow(<Account />);
        wrapper.setState({ loggedIn: true });
        expect(wrapper.find('#accountFlexboxTop').length).toEqual(1);
    });
    it('renders profile pic form', () => {
        const wrapper = shallow(<Account />);
        wrapper.setState({ loggedIn: true });
        expect(wrapper.find('#pictureMessageForm').length).toEqual(1);
    });
});
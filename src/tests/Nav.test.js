import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Nav from '../components/Nav';

configure({ adapter: new Adapter() });

describe('<Nav />', () => {
    it('renders nav bar', () => {
        const wrapper = shallow(<Nav />);
        wrapper.setProps({ page: 'User' });
        expect(wrapper.find('#navBox').length).toEqual(1);
    });
    it('renders hamburger menu', () => {
        const wrapper = shallow(<Nav />);
        wrapper.setProps({ page: 'User' });
        expect(wrapper.find('#hamburgerMenu').length).toEqual(1);
    });
});
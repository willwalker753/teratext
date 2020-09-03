import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Home from '../components/Home';

configure({ adapter: new Adapter() });

describe('<Home />', () => {
    it('renders home mobile view', () => {
        const wrapper = shallow(<Home />);
        expect(wrapper.find('#mobileView').length).toEqual(1);
    });
    it('renders home desktop view', () => {
        const wrapper = shallow(<Home />);
        expect(wrapper.find('#desktopView').length).toEqual(1);
    });
});
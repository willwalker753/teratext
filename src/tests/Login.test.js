import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Login from '../components/Login';

configure({ adapter: new Adapter() });

describe('<Login />', () => {
    it('renders login form', () => {
        const wrapper = shallow(<Login />);
        expect(wrapper.find('#loginForm').length).toEqual(1);
    });
    it('renders login button', () => {
        const wrapper = shallow(<Login />);
        expect(wrapper.find('#loginSubmit').length).toEqual(1);
    });
});
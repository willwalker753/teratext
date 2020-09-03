import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Signup from '../components/Signup';

configure({ adapter: new Adapter() });

describe('<Signup />', () => {
    it('renders signup form', () => {
        const wrapper = shallow(<Signup />);
        expect(wrapper.find('#signupForm').length).toEqual(1);
    });
    it('renders signup button', () => {
        const wrapper = shallow(<Signup />);
        expect(wrapper.find('#signupSubmit').length).toEqual(1);
    });
});
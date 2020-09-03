import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Message from '../components/Message';

configure({ adapter: new Adapter() });

describe('<Message />', () => {
    it('renders message form', () => {
        const wrapper = shallow(<Message />);
        expect(wrapper.find('#messageForm').length).toEqual(0);
    });
    it('renders list of messages', () => {
        const wrapper = shallow(<Message />);
        expect(wrapper.find('#messages').length).toEqual(0);
    });
});
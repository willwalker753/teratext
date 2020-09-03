
import React from 'react';
import { mount, configure } from 'enzyme';
import { MemoryRouter } from 'react-router';
import HomePage from './components/Home';
import App from './App';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

test('root path redirect to home page', () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={['/']}>
      <App/>
    </MemoryRouter>
  );
  expect(wrapper.find(HomePage)).toHaveLength(1);
});

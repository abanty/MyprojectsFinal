import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import InsertarEmpleado from '../InsertarEmpleado';

//test('InsertarEmpleado renders properly', () => {
 // const wrapper = shallow(<InsertarEmpleado/>);
  //const element = wrapper.find('form');
  //expect(element.find('input').length).toBe(3);
 // expect(element.find('input').get(0).props.name).toBe('username');
 // expect(element.find('input').get(1).props.name).toBe('email');
 // expect(element.find('input').get(2).props.type).toBe('submit');
//});

test('InsertarEmpleado renders a snapshot properly', () => {
  const tree = renderer.create(<InsertarEmpleado/>).toJSON();
  expect(tree).toMatchSnapshot();
});

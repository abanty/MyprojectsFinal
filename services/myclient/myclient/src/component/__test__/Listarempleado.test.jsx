import React from 'react';
import { shallow } from 'enzyme'; 
import Listarempleado from '../Listarempleado';
import renderer from 'react-test-renderer';
 
const users = [
  {
	'active': true,
	'email': 'aprobadocontrece@gmail.com',
	'id': 1,
  'username': 'abanto',
  'address': 'alameda',
  'phone': '991644787',
  'age': '25'
  },
  {
	'active': true,
	'email': 'aprobadoconquince@upeu.edu.pe',
	'id': 2,
  'username': 'omar',
  'address': 'inti',
  'phone': '991111187',
  'age': '21'
  }
];
 
test('Listarempleado renders properly', () => {
  const wrapper = shallow(<Listarempleado users={users}/>);
  const element = wrapper.find('th');
  expect(element.length).toBe(5);
  expect(element.get(0).props.children).toBe('Usuario');
});
 
test('Listarempleado snapshot properly', () => {
  const tree = renderer.create(<Listarempleado users={users}/>).toJSON();
  expect(tree).toMatchSnapshot();  
});



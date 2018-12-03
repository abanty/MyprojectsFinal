import React from 'react';
import { shallow } from 'enzyme'; 
import Listarempleado from '../Listarempleado';
import renderer from 'react-test-renderer';
 
const users = [
  {
	'active': true,
	'email': 'abelthf@gmail.com',
	'id': 1,
	'username': 'abelthf'
  },
  {
	'active': true,
	'email': 'abel.huanca@upeu.edu.pe',
	'id': 2,
	'username': 'abel'
  }
];
 
test('Listarempleado renders properly', () => {
  const wrapper = shallow(<Listarempleado users={users}/>);
  const element = wrapper.find('h4');
  expect(element.length).toBe(2);
  expect(element.get(0).props.children).toBe('abelthf');
});
 
test('Listarempleado renders properly', () => {
  const tree = renderer.create(<Listarempleado users={users}/>).toJSON();
  expect(tree).toMatchSnapshot();  
});



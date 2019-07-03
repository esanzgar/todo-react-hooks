// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';
//
// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });

import React from 'react';
import {shallow} from 'enzyme';
import App from './App';

describe('TodoList', () => {
  it('renders', () => {
    shallow(<App />);
  });

  it('initally displays 3 todo items', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('.todo')).toHaveLength(3);
    expect(wrapper.find('.todo-is-completed')).toHaveLength(1);
  });

  it('mark todo as completed', () => {
    const wrapper = shallow(<App />);
    const todos = wrapper.find('.todo');
    expect(todos).toHaveLength(3);
    expect(wrapper.find('.todo-is-completed')).toHaveLength(1);
    todos
      .last()
      .find('.checkbox')
      .simulate('click');
    expect(wrapper.find('.todo-is-completed')).toHaveLength(2);
  });

  it('add todo item', () => {
    const wrapper = shallow(<App />);
    const todos = wrapper.find('.todo');
    expect(todos).toHaveLength(3);
    expect(wrapper.find('.todo-is-completed')).toHaveLength(1);
    todos
      .last()
      .find('input')
      .simulate('keydown', {key: 'Enter'});
    expect(wrapper.find('.todo-is-completed')).toHaveLength(1);
    expect(wrapper.find('.todo')).toHaveLength(4);
  });
});

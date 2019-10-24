import React from 'react';
import ReactDOM from 'react-dom';
import { Stepper } from '../src';

describe('it', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Stepper />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

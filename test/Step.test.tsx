import React from 'react';
import ReactDOM from 'react-dom';
import { Step } from '../src';

describe('it', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Step active completed={false} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

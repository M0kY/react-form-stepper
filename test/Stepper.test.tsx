import React from 'react';
import ReactDOM from 'react-dom';
import { Stepper } from '../src';

describe('it', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Stepper
        steps={[{ label: 'Step 1' }, { label: 'Step 2' }, { label: 'Step 3' }]}
        activeStep={1}
      />,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});

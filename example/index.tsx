import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Stepper, Step } from 'react-form-stepper';

const App: React.FC = () => {
  return (
    <div>
      <Stepper
        //steps={[{ label: 'Step 1' }, { label: 'Step 2' }, { label: 'Step 3' }]}
        activeStep={1}
      >
        <Step label="Children Step 1" />
        <Step label="Children Step 1" />
        <Step label="Children Step 1" />
      </Stepper>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

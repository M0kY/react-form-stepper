import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { Stepper, Step } from '../dist';

const App: React.FC = () => {
  return (
    <div>
      <Stepper
        //steps={[{ label: 'Step 1' }, { label: 'Step 2' }, { label: 'Step 3' }]}
        activeStep={2}
        connectorStateColors
        connectorStyleConfig={{ size: 2 }}
        styleConfig={{ size: 50 }}
      >
        <Step label="Children Step 1" />
        <Step label="Children Step 2" />
        <Step label="Children Step 3" />
        <Step label="Children Step 4" />
      </Stepper>
    </div>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

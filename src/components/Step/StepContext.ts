import React from 'react';

interface IStepContext {
  completed: boolean;
  active: boolean;
  disabled: boolean;
  index: number;
  stepSize?: string | number;
}

const StepContext = React.createContext<IStepContext>({
  completed: false,
  active: false,
  disabled: false,
  index: 0,
});

if (process.env.NODE_ENV !== 'production') {
  StepContext.displayName = 'StepContext';
}

export default StepContext;

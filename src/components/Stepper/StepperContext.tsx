import React from 'react';
import { ConnectorStyleProps } from '../Connector/ConnectorTypes';

interface IStepperContext {
  activeStep: number;
  hideConnectors: boolean | 'inactive';
  nonLinear: boolean;
  connectorStateColors: boolean;
  connectorStyleConfig?: ConnectorStyleProps;
}

const StepperContext = React.createContext<IStepperContext>({
  activeStep: 0,
  hideConnectors: false,
  nonLinear: false,
  connectorStateColors: false,
});

if (process.env.NODE_ENV !== 'production') {
  StepperContext.displayName = 'StepperContext';
}

export default StepperContext;

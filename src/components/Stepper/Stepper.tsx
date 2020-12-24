import React from 'react';
import { jss } from 'react-jss';
import clsx from 'clsx';
import { GenerateId, CreateGenerateId } from 'jss';

import Step from '../Step/Step';
import { StepperProps } from './StepperTypes';
import { useStepperStyles } from './StepperStyles';
import StepperContext from './StepperContext';

const generateId: GenerateId = rule => `RFS-${rule.key}`;

const createGenerateId: CreateGenerateId = () => {
  return generateId;
};

jss.setup({ createGenerateId });

const Stepper: React.FC<StepperProps> = ({
  steps,
  children,
  connectorStateColors = false,
  className = '',
  stepClassName = '',
  activeStep = 0,
  styleConfig,
  connectorStyleConfig,
  hideConnectors = false,
  nonLinear = false,
}) => {
  const classes = useStepperStyles();

  const contextValue = React.useMemo(
    () => ({
      activeStep,
      hideConnectors,
      nonLinear,
      connectorStateColors: connectorStateColors && !nonLinear,
      connectorStyleConfig,
    }),
    [
      activeStep,
      hideConnectors,
      nonLinear,
      connectorStateColors,
      connectorStyleConfig,
    ]
  );

  const useStepsProp = steps instanceof Array && steps.length > 0;
  const stepsArray = useStepsProp ? steps : React.Children.toArray(children);

  const stepsToRender = stepsArray!.map((step, index) => {
    if (!useStepsProp && !React.isValidElement(step)) return null;

    const stepProps = {
      className: stepClassName,
      styleConfig,
      index,
    };

    return (
      <div key={index} className={classes.StepContainer}>
        {React.isValidElement(step) ? (
          React.cloneElement(step, {
            ...stepProps,
            ...step.props,
          })
        ) : (
          <Step {...stepProps} {...step} />
        )}
      </div>
    );
  });

  return (
    <StepperContext.Provider value={contextValue}>
      <div className={clsx(classes.StepperContainer, className)}>
        {stepsToRender}
      </div>
    </StepperContext.Provider>
  );
};

export default Stepper;

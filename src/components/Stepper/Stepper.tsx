import React from 'react';
// import { jss } from 'react-jss';
import clsx from 'clsx';
// import { GenerateId, CreateGenerateId } from 'jss';

import Step from '../Step/Step';
import { StepperProps } from './StepperTypes';
import { useStepperStyles } from './StepperStyles';
import StepperContext from './StepperContext';
import { StepDTO } from '../Step/StepTypes';

// const generateId: GenerateId = rule => `${rule.key}`;

// const createGenerateId: CreateGenerateId = () => {
//   return generateId;
// };

// jss.setup({ createGenerateId });

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
  ...rest
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
  const stepsArray = (useStepsProp
    ? steps
    : React.Children.toArray(children)) as Array<
    | StepDTO
    | (
        | string
        | number
        | React.ReactElement<any, string | React.JSXElementConstructor<any>>
        | React.ReactFragment
        | React.ReactPortal
      )
  >;

  const stepsToRender = stepsArray.map((step, index) => {
    if (!useStepsProp && !React.isValidElement(step)) return null;

    const stepProps = {
      className: stepClassName,
      styleConfig,
      index,
    };

    return (
      <div key={index} id="RFS-StepContainer" className={classes.StepContainer}>
        {React.isValidElement(step) ? (
          React.cloneElement(step, {
            ...stepProps,
            ...step.props,
          })
        ) : (
          <Step {...stepProps} {...(typeof step === 'object' ? step : {})} />
        )}
      </div>
    );
  });

  return (
    <StepperContext.Provider value={contextValue}>
      <div
        id="RFS-StepperContainer"
        className={clsx(classes.StepperContainer, className)}
        {...rest}
      >
        {stepsToRender}
      </div>
    </StepperContext.Provider>
  );
};

export default Stepper;

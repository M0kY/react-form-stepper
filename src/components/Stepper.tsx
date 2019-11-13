import React from 'react';
import { jss } from 'react-jss';
import clsx from 'clsx';
import { GenerateId, CreateGenerateId } from 'jss';
import Step from './Step';
import Connector from './Connector';
import { StepDTO, StepStyleDTO, ConnectorStyleProps } from '../types';
import {
  useStepperStyles,
  stepStyleDefaults,
  connectorStyleDefaults,
} from '../styles';

interface StepperProps {
  steps?: StepDTO[];
  activeStep: number;
  connectorStateColors?: boolean;
  className?: string;
  stepClassName?: string;
  styleConfig?: StepStyleDTO;
  connectorStyleConfig?: ConnectorStyleProps;
  hideConnectors?: boolean | 'inactive';
}

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
}) => {
  const classes = useStepperStyles();

  const generateStepProps = (index: number, activeStep: number) => {
    return {
      className: stepClassName,
      children: index,
      completed: index < activeStep,
      active: index === activeStep,
      styleConfig,
    };
  };

  const useStepsProp = steps instanceof Array && steps.length > 0;
  const stepsArray = useStepsProp ? steps : React.Children.toArray(children);

  const stepsToRender = stepsArray!.map((step, index) => {
    if (!useStepsProp && !React.isValidElement(step)) return null;
    const stepProps = generateStepProps(index, activeStep);
    return (
      <div key={index} className={classes.StepContainer}>
        {index !== 0 &&
          // If hideConnectors === 'inactive' render only active or completed connectors
          // If hideConnectors is something other than 'inactive' or true render all connectors
          ((hideConnectors === 'inactive' &&
            (stepProps.active || stepProps.completed)) ||
            (hideConnectors !== true && hideConnectors !== 'inactive')) && (
            <Connector
              completed={stepProps.completed}
              active={stepProps.active}
              stateColors={connectorStateColors}
              connectorStyle={{
                ...connectorStyleDefaults,
                ...connectorStyleConfig,
                stepSize:
                  (styleConfig && styleConfig.size) || stepStyleDefaults.size,
              }}
            />
          )}
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
    <div className={clsx(classes.StepperContainer, className)}>
      {stepsToRender}
    </div>
  );
};

export default Stepper;

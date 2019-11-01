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
        {index !== 0 && (
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

import React from 'react';
import { jss } from 'react-jss';
import clsx from 'clsx';
import { GenerateId, CreateGenerateId } from 'jss';
import Step from './Step';
import Connector from './Connector';
import { StepDTO, StepStyleDTO } from '../types';
import { useStepperStyles, stepStyleDefaults } from '../styles';

interface StepperProps {
  steps?: StepDTO[];
  activeStep: number;
  connectorStateColors?: boolean;
  className?: string;
  stepClassName?: string;
  styleConfig?: StepStyleDTO;
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
  styleConfig = stepStyleDefaults,
}) => {
  const classes = useStepperStyles();

  const childrenSteps = React.Children.toArray(children);

  const generateStepProps = (index: number, activeStep: number) => {
    return {
      key: index,
      className: stepClassName,
      children: index,
      completed: index < activeStep,
      active: index === activeStep,
      connectorStateColors,
      first: index === 0,
      styleConfig,
    };
  };

  let stepsToRender = null;

  if (steps && steps.length > 0) {
    stepsToRender = steps.map((step, index) => (
      <Step {...generateStepProps(index, activeStep)} {...step} />
    ));
  } else {
    stepsToRender = childrenSteps.map((childStep, index) => {
      if (React.isValidElement(childStep)) {
        const stepProps = generateStepProps(index, activeStep);
        return (
          <div className={classes.StepContainer}>
            {index !== 0 && (
              <Connector
                completed={stepProps.completed}
                active={stepProps.active}
                stateColors={connectorStateColors}
              />
            )}
            {React.cloneElement(childStep, {
              ...stepProps,
              ...childStep.props,
            })}
          </div>
        );
      }
      return null;
    });
  }

  return (
    <div className={clsx(classes.StepperContainer, className)}>
      {stepsToRender}
    </div>
  );
};

export default Stepper;

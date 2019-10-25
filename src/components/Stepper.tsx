import React, { ReactNode } from 'react';
import { jss } from 'react-jss';
import vendorPrefixer from 'jss-plugin-vendor-prefixer';
import nested from 'jss-plugin-nested';
import clsx from 'clsx';
import { GenerateId, CreateGenerateId } from 'jss';
import Step from './Step';
import { StepDTO, StepStyleDTO } from '../types';
import { useStepperStyles, stepStyleDefaults } from '../styles';

interface StepperProps {
  steps?: StepDTO[];
  activeStep: number;
  children?: ReactNode;
  className?: string;
  stepClassName?: string;
  styleConfig?: StepStyleDTO;
}

const generateId: GenerateId = rule => `RFS-${rule.key}`;

const createGenerateId: CreateGenerateId = () => {
  return generateId;
};

jss.setup({ createGenerateId });
jss.use(vendorPrefixer());
jss.use(nested());

const Stepper: React.FC<StepperProps> = ({
  steps,
  children,
  className,
  stepClassName,
  activeStep,
  styleConfig,
}) => {
  const classes = useStepperStyles();

  const childrenSteps = React.Children.toArray(children);

  const generateStepProps = (
    index: number,
    activeStep: number,
    arrayLength: number
  ) => {
    return {
      key: index,
      className: stepClassName,
      children: index,
      completed: index < activeStep,
      active: index === activeStep,
      last: index + 1 === arrayLength,
      styleConfig,
    };
  };

  let stepsToRender = null;

  if (steps && steps.length > 0) {
    stepsToRender = steps.map((step, index) => (
      <Step {...generateStepProps(index, activeStep, steps.length)} {...step} />
    ));
  } else {
    stepsToRender = childrenSteps.map((childStep, index) => {
      if (React.isValidElement(childStep)) {
        return React.cloneElement(childStep, {
          ...generateStepProps(index, activeStep, childrenSteps.length),
          ...childStep.props,
        });
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

Stepper.defaultProps = {
  activeStep: 0,
  className: '',
  stepClassName: '',
  styleConfig: stepStyleDefaults,
};

export default Stepper;

import React, { ReactNode } from 'react';
import { jss } from 'react-jss';
import vendorPrefixer from 'jss-plugin-vendor-prefixer';
import nested from 'jss-plugin-nested';
import { GenerateId, CreateGenerateId } from 'jss';
import Step from './Step';
import { StepDTO, StepStyleDTO } from '../types';
import { useStepperStyles, stepStyleDefaults } from '../styles';

interface StepperProps {
  steps?: StepDTO[];
  activeStep: number;
  children?: ReactNode;
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
      circleContent: index,
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

  return <div className={classes.StepperContainer}>{stepsToRender}</div>;
};

Stepper.defaultProps = {
  activeStep: 0,
  styleConfig: stepStyleDefaults,
};

export default Stepper;

import * as React from 'react';
import clsx from 'clsx';

import { useStepStyles, stepStyleDefaults } from './StepStyles';
import StepperContext from '../Stepper/StepperContext';
import Connector from '../Connector/Connector';
import { StepProps, StepStyleProps } from './StepTypes';

const Step: React.FC<StepProps> = ({
  children,
  label = '',
  styleConfig,
  completed: completedProp,
  active: activeProp,
  disabled: disabledProp,
  className,
  index = 0,
  ...rest
}) => {
  const {
    activeStep,
    hideConnectors,
    nonLinear,
    connectorStateColors,
    connectorStyleConfig,
  } = React.useContext(StepperContext);

  let [active = false, completed = false, disabled = false] = [
    activeProp,
    completedProp,
    disabledProp,
  ];

  if (activeStep === index) {
    active = activeProp !== undefined ? activeProp : true;
  } else if (!nonLinear && activeStep > index) {
    completed = completedProp !== undefined ? completedProp : true;
  } else if (!nonLinear && activeStep < index) {
    disabled = disabledProp !== undefined ? disabledProp : true;
  }

  const stepStyleProps: StepStyleProps = {
    ...styleConfig!,
    completed,
    active: active || !disabled,
  };
  const classes = useStepStyles({
    ...stepStyleDefaults,
    ...(stepStyleProps.size &&
      !stepStyleProps.circleFontSize && {
        circleFontSize: `calc(${stepStyleProps.size} / 2)`,
      }),
    ...stepStyleProps,
  });

  return (
    <React.Fragment>
      {index !== 0 &&
        // If hideConnectors === 'inactive' render only active or completed connectors
        // If hideConnectors is something other than 'inactive' or true render all connectors
        ((hideConnectors === 'inactive' && (active || completed)) ||
          (hideConnectors !== true && hideConnectors !== 'inactive')) && (
          <Connector
            completed={completed}
            active={active}
            stateColors={connectorStateColors}
            connectorStyle={{
              ...connectorStyleConfig,
              stepSize:
                (styleConfig && styleConfig.size) || stepStyleDefaults.size,
            }}
          />
        )}
      <div className={classes.StepMain}>
        <button
          disabled={disabled}
          className={clsx(
            classes.StepCircle,
            classes.StepButton,
            { active: !disabled },
            { completed },
            className
          )}
          {...rest}
        >
          <span
            className={clsx(
              classes.StepCircleContent,
              { active: !disabled },
              { completed }
            )}
          >
            {children || index + 1}
          </span>
        </button>
        {label && (
          <div className={classes.LabelContainer}>
            <span className={classes.Label}>{label}</span>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default Step;

import * as React from 'react';
import clsx from 'clsx';

import { useStepStyles, stepStyleDefaults } from './StepStyles';
import StepperContext from '../Stepper/StepperContext';
import Connector from '../Connector';
import { StepProps, StepStyleProps } from './StepTypes';
import StepContext from './StepContext';
import StepButton from '../StepButton';
import StepLabel from '../StepLabel';

const Step: React.FC<StepProps> = ({
  children,
  label = '',
  styleConfig,
  completed: completedProp,
  active: activeProp,
  disabled: disabledProp,
  className,
  index = 0,
  dir,
  ...rest
}) => {
  const { activeStep, hideConnectors, nonLinear, lastStepIndex } =
    React.useContext(StepperContext);

  let [active = false, completed = false, disabled = false] = [
    activeProp,
    completedProp,
    disabledProp,
  ];

  if (activeStep === index) {
    active = activeProp !== undefined ? activeProp : true;
  } else if (!nonLinear && activeStep > index && !activeProp && !disabledProp) {
    completed = completedProp !== undefined ? completedProp : true;
  } else if (
    !nonLinear &&
    activeStep < index &&
    !activeProp &&
    !completedProp
  ) {
    disabled = disabledProp !== undefined ? disabledProp : true;
  }

  const stepStyleProps: StepStyleProps = {
    ...styleConfig!,
    completed: completed && !disabled,
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

  const contextValue = {
    completed,
    active,
    disabled,
    index,
    stepSize: (styleConfig && styleConfig.size) || stepStyleDefaults.size,
  };

  const showConnector = () => {
    // If hideConnectors === 'inactive' render only active or completed connectors
    // If hideConnectors is something other than 'inactive' or true render all connectors
    return ((hideConnectors === 'inactive' && (active || completed)) ||
      (hideConnectors !== true && hideConnectors !== 'inactive'))
  }

  return (
    <StepContext.Provider value={contextValue}>
      {showConnector() && dir !== "rtl" && index !== 0 && <Connector />}
      <div dir={dir} id="RFS-StepMain" className={classes.StepMain}>
        <StepButton
          id="RFS-StepButton"
          className={clsx(
            classes.StepButton,
            { active: !disabled && !completed },
            { completed },
            className
          )}
          contentClasses={classes.StepButtonContent}
          {...rest}
        >
          {children || index + 1}
        </StepButton>
        {label && (
          <StepLabel
            fontSize={styleConfig?.labelFontSize}
            fontWeight={styleConfig?.fontWeight}
          >
            {label}
          </StepLabel>
        )}
      </div>
      {showConnector() && dir === "rtl" && index != lastStepIndex && <Connector />}
    </StepContext.Provider>
  );
};

export default Step;

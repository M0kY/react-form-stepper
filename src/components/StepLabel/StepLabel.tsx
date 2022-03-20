import React from 'react';
import { useStepLabelStyles } from './StepLabelStyles';
import { StepLabelProps } from './StepLabelTypes';

const StepLabel: React.FC<StepLabelProps> = ({
  children,
  fontSize,
  fontWeight,
}) => {
  const classes = useStepLabelStyles({ fontSize, fontWeight });

  return (
    <div id="RFS-LabelContainer" className={classes.LabelContainer}>
      <span id="RFS-Label" className={classes.Label}>
        {children}
      </span>
    </div>
  );
};

export default StepLabel;

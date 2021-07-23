import React from 'react';
import clsx from 'clsx';
import StepContext from '../Step/StepContext';
import { StepButtonProps } from './StepButtonProps';

const StepButton: React.FC<StepButtonProps> = ({
  children,
  contentClasses,
  ...rest
}) => {
  const { completed, disabled, index } = React.useContext(StepContext);

  return (
    <button disabled={disabled} {...rest}>
      <span
        className={clsx(
          contentClasses,
          { active: !disabled && !completed },
          { completed }
        )}
      >
        {children || index + 1}
      </span>
    </button>
  );
};

export default StepButton;

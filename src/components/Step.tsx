import * as React from 'react';
import clsx from 'clsx';
import { StepDTO, StepStyleDTO, StepStyleProps } from '../types';
import { useStepStyles, stepStyleDefaults } from '../styles';

interface StepProps
  extends StepDTO,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
  connectorStateColors?: boolean;
  styleConfig?: StepStyleDTO;
  className?: string;
}

const Step: React.FC<StepProps> = ({
  children,
  label = '',
  styleConfig,
  completed = false,
  active = false,
  className,
  ...rest
}) => {
  const stepStyleProps: StepStyleProps = { ...styleConfig!, completed, active };
  const classes = useStepStyles({
    ...stepStyleDefaults,
    ...(stepStyleProps.size &&
      !stepStyleProps.circleFontSize && {
        circleFontSize: `calc(${stepStyleProps.size} / 2)`,
      }),
    ...stepStyleProps,
  });

  return (
    <div className={classes.StepMain}>
      <button
        disabled={!active && !completed}
        className={clsx(
          classes.StepCircle,
          classes.StepButton,
          { active },
          { completed },
          className
        )}
        {...rest}
      >
        <span
          className={clsx(classes.StepCircleContent, { active }, { completed })}
        >
          {children}
        </span>
      </button>
      {label && (
        <div className={classes.LabelContainer}>
          <span className={classes.Label}>{label}</span>
        </div>
      )}
    </div>
  );
};

export default Step;

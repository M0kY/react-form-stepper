import * as React from 'react';
import classNames from 'classnames';
import Connector from './Connector';
import { StepDTO, StepStyleDTO, StepStyleProps } from '../types';
import { useStepStyles, stepStyleDefaults } from '../styles';

interface StepProps extends StepDTO {
  key?: any;
  last?: boolean;
  label?: string;
  circleContent: any;
  active: boolean;
  completed: boolean;
  styleConfig?: StepStyleDTO;
}

const Step: React.FC<StepProps> = ({
  circleContent,
  label,
  last,
  styleConfig,
  completed,
  active,
}) => {
  const stepStyleProps: StepStyleProps = { ...styleConfig!, completed, active };
  const classes = useStepStyles(stepStyleProps);

  return (
    <div className={classes.StepContainer}>
      {!last && <Connector completed={completed} />}
      <div className={classes.StepMain}>
        <div
          className={classNames(classes.StepCircle, { active }, { completed })}
        >
          <span
            className={classNames(
              classes.StepCircleContent,
              { active },
              { completed }
            )}
          >
            {circleContent}
          </span>
        </div>
        {label && (
          <div className={classes.LabelContainer}>
            <span className={classes.Label}>{label}</span>
          </div>
        )}
      </div>
    </div>
  );
};

Step.defaultProps = {
  label: '',
  styleConfig: stepStyleDefaults,
};

export default Step;

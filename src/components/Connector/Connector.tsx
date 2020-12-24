import React from 'react';
import clsx from 'clsx';

import { connectorStyleDefaults, useConnectorStyles } from './ConnectorStyles';
import { ConnectorProps } from './ConnectorTypes';
import { convertNumericToPixel } from '../../utils';

const Connector: React.FC<ConnectorProps> = ({
  completed = false,
  active = false,
  stateColors = false,
  connectorStyle,
}) => {
  const newConnectorStyle = {
    ...connectorStyleDefaults,
    ...connectorStyle,
  };

  convertNumericToPixel(newConnectorStyle, 'stepSize');
  convertNumericToPixel(newConnectorStyle, 'size');

  const classes = useConnectorStyles(newConnectorStyle);
  return (
    <div className={classes.ConnectorContainer}>
      <span
        className={clsx(
          classes.Connector,
          { completed: completed && stateColors },
          { active: active && stateColors }
        )}
      ></span>
    </div>
  );
};

export default Connector;

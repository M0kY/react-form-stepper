import React from 'react';
import clsx from 'clsx';
import { useConnectorStyles } from '../styles';
import { ConnectorStyleProps } from '../types';

interface ConnectorProps {
  completed?: boolean;
  active?: boolean;
  stateColors?: boolean;
  connectorStyle?: ConnectorStyleProps;
}

const Connector: React.FC<ConnectorProps> = ({
  completed = false,
  active = false,
  stateColors = false,
  connectorStyle,
}) => {
  const classes = useConnectorStyles(connectorStyle);
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

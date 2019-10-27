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
  connectorStyle = {
    disabledColor: '#bdbdbd',
    activeColor: '#ed1d24',
    completedColor: '#a10308',
    size: 1,
    style: 'solid',
  },
}) => {
  const classes = useConnectorStyles({ ...connectorStyle, completed });
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

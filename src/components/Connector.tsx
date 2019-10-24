import React from 'react';
import classNames from 'classnames';
import { useConnectorStyles } from '../styles';
import { ConnectorStyleProps } from '../types';

interface ConnectorProps {
  completed?: boolean;
  connectorStyle?: ConnectorStyleProps;
}

const Connector: React.FC<ConnectorProps> = ({ completed, connectorStyle }) => {
  const classes = useConnectorStyles({ ...connectorStyle, completed });
  return (
    <div className={classes.ConnectorContainer}>
      <span className={classNames(classes.Connector, { completed })}></span>
    </div>
  );
};

Connector.defaultProps = {
  completed: false,
  connectorStyle: {
    disabledColor: '#bdbdbd',
    completedColor: '#a10308',
    size: 1,
    style: 'solid',
  },
};

export default Connector;

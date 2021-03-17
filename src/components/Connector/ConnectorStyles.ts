import { createUseStyles } from 'react-jss';
import { ConnectorStyleProps } from './ConnectorTypes';

export const connectorStyleDefaults: ConnectorStyleProps = {
  disabledColor: '#bdbdbd',
  activeColor: '#ed1d24',
  completedColor: '#a10308',
  size: 1,
  style: 'solid',
};

export const useConnectorStyles = createUseStyles({
  ConnectorContainer: (props: ConnectorStyleProps) => ({
    top: `calc((${props.stepSize} - ${props.size}) / 2)`,
    left: `calc(-50% + ${props.stepSize} - 8px)`,
    right: `calc(50% + ${props.stepSize} - 8px)`,
    position: 'absolute',
  }),
  Connector: (props: ConnectorStyleProps) => ({
    borderTopStyle: props.style,
    borderTopWidth: props.size,
    borderColor: props.disabledColor,
    display: 'block',
    '&.completed': {
      borderColor: props.completedColor,
    },
    '&.active': {
      borderColor: props.activeColor,
    },
  }),
});

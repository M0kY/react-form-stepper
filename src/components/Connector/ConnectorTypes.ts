export interface ConnectorStyleProps {
  [key: string]: any;
  disabledColor: string;
  activeColor: string;
  completedColor: string;
  size: React.ReactText;
  stepSize?: React.ReactText;
  style: string;
}

export interface ConnectorProps {
  completed?: boolean;
  active?: boolean;
  stateColors?: boolean;
  connectorStyle: Partial<ConnectorStyleProps>;
}

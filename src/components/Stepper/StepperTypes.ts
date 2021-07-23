import { ConnectorStyleProps } from '../Connector/ConnectorTypes';
import { StepDTO, StepStyleDTO } from '../Step/StepTypes';

export interface StepperProps extends React.HTMLProps<HTMLDivElement> {
  steps?: StepDTO[];
  activeStep?: number;
  connectorStateColors?: boolean;
  stepClassName?: string;
  styleConfig?: StepStyleDTO;
  connectorStyleConfig?: ConnectorStyleProps;
  hideConnectors?: boolean | 'inactive';
  nonLinear?: boolean;
}

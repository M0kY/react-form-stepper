import { ConnectorStyleProps } from '../Connector/ConnectorTypes';
import { StepDTO, StepStyleDTO } from '../Step/StepTypes';

export interface StepperProps {
  steps?: StepDTO[];
  activeStep: number;
  connectorStateColors?: boolean;
  className?: string;
  stepClassName?: string;
  styleConfig?: StepStyleDTO;
  connectorStyleConfig?: ConnectorStyleProps;
  hideConnectors?: boolean | 'inactive';
  nonLinear?: boolean;
}

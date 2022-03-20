import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Stepper, Step } from '../../';

describe('<Stepper />', () => {
  describe('rendering children', () => {
    it('renders 3 Step and 2 StepConnector components', () => {
      const { container } = render(
        <Stepper>
          <Step />
          <Step />
          <Step />
        </Stepper>
      );

      const steps = container.querySelectorAll('#RFS-StepMain');
      const connectors = container.querySelectorAll('#RFS-Connector');

      expect(steps).toHaveLength(3);
      expect(connectors).toHaveLength(2);
    });

    it('renders with Steps defined as prop', () => {
      const { container } = render(
        <Stepper
          steps={[
            { label: 'Step 1' },
            { label: 'Step 2' },
            { label: 'Step 3' },
          ]}
        />
      );

      const steps = container.querySelectorAll('#RFS-StepMain');
      const connectors = container.querySelectorAll('#RFS-Connector');

      expect(steps).toHaveLength(3);
      expect(connectors).toHaveLength(2);
    });
  });

  describe('controlling child props', () => {
    it('controls children linearly based on the activeStep prop', () => {
      const element = (
        <Stepper activeStep={0} connectorStateColors>
          <Step />
          <Step />
          <Step />
        </Stepper>
      );

      const { container, rerender } = render(element);

      const stepButtons = container.querySelectorAll('#RFS-StepButton');
      const connectors = container.querySelectorAll('#RFS-Connector');

      expect(stepButtons[0]).toHaveClass('active');
      expect(stepButtons[1]).not.toHaveClass('active', 'completed');
      expect(stepButtons[2]).not.toHaveClass('active', 'completed');
      expect(connectors[0]).not.toHaveClass('completed', 'active');
      expect(connectors[1]).not.toHaveClass('completed', 'active');

      rerender(React.cloneElement(element, { activeStep: 1 }));

      expect(stepButtons[0]).toHaveClass('completed');
      expect(stepButtons[1]).toHaveClass('active');
      expect(connectors[0]).toHaveClass('active');
      expect(connectors[1]).not.toHaveClass('completed', 'active');
    });

    it('controls children non-linearly based on the activeStep prop', () => {
      const element = (
        <Stepper activeStep={0} nonLinear connectorStateColors>
          <Step />
          <Step />
          <Step />
        </Stepper>
      );

      const { container, rerender } = render(element);

      const stepButtons = container.querySelectorAll('#RFS-StepButton');
      const connectors = container.querySelectorAll('#RFS-Connector');

      expect(stepButtons[0]).not.toHaveClass('completed');
      expect(stepButtons[1]).not.toHaveClass('completed', 'disabled');
      expect(stepButtons[2]).not.toHaveClass('completed', 'disabled');
      expect(connectors[0]).not.toHaveClass('completed', 'active');
      expect(connectors[1]).not.toHaveClass('completed', 'active');

      rerender(React.cloneElement(element, { activeStep: 1 }));

      expect(stepButtons[0]).not.toHaveClass('completed');
      expect(stepButtons[1]).not.toHaveClass('completed');
      expect(stepButtons[1]).not.toHaveClass('completed');
      expect(stepButtons[2]).not.toHaveClass('completed', 'disabled');
      expect(connectors[0]).not.toHaveClass('active', 'completed');
      expect(connectors[1]).not.toHaveClass('active', 'completed');

      rerender(React.cloneElement(element, { activeStep: 2 }));

      expect(stepButtons[0]).not.toHaveClass('completed');
      expect(stepButtons[1]).not.toHaveClass('completed');
      expect(stepButtons[2]).not.toHaveClass('completed');
      expect(connectors[0]).not.toHaveClass('active', 'completed');
      expect(connectors[1]).not.toHaveClass('active', 'completed');
    });
  });

  describe('step connector', () => {
    it('should allow the step connector to be removed', () => {
      const { container } = render(
        <Stepper hideConnectors>
          <Step />
          <Step />
        </Stepper>
      );

      const connectors = container.querySelectorAll('#RFS-Connector');

      expect(connectors).toHaveLength(0);
    });

    it('should pass active prop to connector when second step is active', () => {
      const { container } = render(
        <Stepper activeStep={1} connectorStateColors>
          <Step />
          <Step />
        </Stepper>
      );

      const connector = container.querySelector('#RFS-Connector');

      expect(connector).toHaveClass('active');
    });

    it('should pass completed prop to connector when second step is completed', () => {
      const { container } = render(
        <Stepper activeStep={2} connectorStateColors>
          <Step />
          <Step />
        </Stepper>
      );

      const connector = container.querySelector('#RFS-Connector');

      expect(connector).toHaveClass('completed');
    });
  });
});

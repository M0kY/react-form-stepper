import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Stepper, Step } from '../../';

describe('<Step />', () => {
  it('merges styles and other props into the root node', () => {
    const { getByTestId } = render(
      <Step
        index={1}
        style={{
          paddingRight: 200,
          color: 'purple',
          border: '1px solid tomato',
        }}
        data-testid="root"
      />
    );

    const rootNode = getByTestId('root');
    expect(rootNode.style).toHaveProperty('paddingRight', '200px');
    expect(rootNode.style).toHaveProperty('color', 'purple');
    expect(rootNode.style).toHaveProperty('border', '1px solid tomato');
  });

  describe('rendering children', () => {
    it('renders children', () => {
      const { getByText } = render(
        <Step>
          <div>Step 1</div>
          <div>Hello</div>
        </Step>
      );

      const stepLabel1 = getByText('Step 1');
      const stepLabel2 = getByText('Hello');

      expect(stepLabel1).not.toEqual(null);
      expect(stepLabel2).not.toEqual(null);
    });

    it('should handle null children', () => {
      const { getByText } = render(
        <Step>
          <div>Step 1</div>
          {null}
        </Step>
      );

      const stepLabel1 = getByText('Step 1');
      expect(stepLabel1).not.toEqual(null);
    });
  });

  describe('overriding context props', () => {
    it('overrides "active" context value', () => {
      const { container } = render(
        <Stepper activeStep={1}>
          <Step label="Step 1" />
          <Step label="Step 2" />
          <Step label="Step 3" active />
        </Stepper>
      );

      const stepButton = container.querySelectorAll('#RFS-StepButton');

      expect(stepButton[2]).toHaveClass('active');
    });

    it('overrides "completed" context value', () => {
      const { container } = render(
        <Stepper activeStep={1}>
          <Step label="Step 1" />
          <Step label="Step 2" />
          <Step label="Step 3" completed />
        </Stepper>
      );

      const stepButton = container.querySelectorAll('#RFS-StepButton');

      expect(stepButton[2]).toHaveClass('completed');
    });

    it('overrides "disabled" context value', () => {
      const { container } = render(
        <Stepper activeStep={1}>
          <Step label="Step 1" />
          <Step label="Step 2" disabled />
          <Step label="Step 3" />
        </Stepper>
      );

      const stepButton = container.querySelectorAll('#RFS-StepButton');

      expect(stepButton[1]).toHaveProperty('disabled');
    });
  });
});

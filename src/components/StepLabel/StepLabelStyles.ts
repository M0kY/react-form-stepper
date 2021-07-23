import { createUseStyles } from 'react-jss';
import { StepLabelStyleProps } from './StepLabelTypes';

export const useStepLabelStyles = createUseStyles({
  LabelContainer: (props: StepLabelStyleProps) => ({
    width: '100%',
    fontSize: props.fontSize || '0.875rem',
    fontWeight: 400,
    lineHeight: 1.4,
  }),
  Label: (props: StepLabelStyleProps) => ({
    display: 'block',
    marginTop: 16,
    textAlign: 'center',
    fontWeight: props.fontWeight || 500,
  }),
});

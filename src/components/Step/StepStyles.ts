import { createUseStyles } from 'react-jss';
import { StepStyleProps } from './StepTypes';

export const stepStyleDefaults = {
  activeBgColor: '#ed1d24',
  activeTextColor: '#ffffff',
  completedBgColor: '#a10308',
  completedTextColor: '#ffffff',
  inactiveBgColor: '#e0e0e0',
  inactiveTextColor: '#ffffff',
  size: '2em',
  circleFontSize: '1rem',
  labelFontSize: '0.875rem',
  borderRadius: '50%',
  fontWeight: 500,
};

export const useStepStyles = createUseStyles({
  StepMain: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  StepCircle: (props: StepStyleProps) => ({
    borderRadius: props.borderRadius,
    backgroundColor: props.inactiveBgColor,
    width: props.size,
    height: props.size,
    fontSize: '1em',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&.active': {
      backgroundColor: props.activeBgColor,
    },
    '&.completed': {
      backgroundColor: props.completedBgColor,
    },
  }),
  StepButton: {
    border: 'none',
    margin: 0,
    padding: 0,
    cursor: 'pointer',
  },
  StepCircleContent: (props: StepStyleProps) => ({
    color: props.inactiveTextColor,
    fontSize: props.circleFontSize,
    fontVariantNumeric: 'tabular-nums',
    '&.active': {
      color: props.activeTextColor,
    },
    '&.completed': {
      color: props.completedTextColor,
    },
  }),
  LabelContainer: (props: StepStyleProps) => ({
    width: '100%',
    fontSize: props.labelFontSize,
    fontWeight: 400,
    lineHeight: 1.4,
  }),
  Label: (props: StepStyleProps) => ({
    display: 'block',
    marginTop: 16,
    textAlign: 'center',
    fontWeight: props.fontWeight,
  }),
});

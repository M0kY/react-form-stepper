import { createUseStyles } from 'react-jss';
import { StepStyleProps, ConnectorStyleProps } from './types';

export const useStepperStyles = createUseStyles({
  StepperContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'row',
    padding: 24,
    fontFamily: 'Arial, Helvetica, sans-serif',
  },
});

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
  StepContainer: {
    flex: 1,
    position: 'relative',
    paddingLeft: 8,
    paddingRight: 8,
  },
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

export const useConnectorStyles = createUseStyles({
  ConnectorContainer: {
    flex: '1 1 auto',
    top: 16,
    left: 'calc(50% + 20px)',
    right: 'calc(-50% + 20px)',
    position: 'absolute',
  },
  Connector: (props: ConnectorStyleProps) => ({
    borderTopStyle: props.style,
    borderTopWidth: props.size,
    borderColor: props.disabledColor,
    display: 'block',
    '&.completed': {
      borderColor: props.completedColor,
    },
  }),
});

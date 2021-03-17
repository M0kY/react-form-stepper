import { createUseStyles } from 'react-jss';
import { StepStyleProps } from './StepTypes';
import Color from 'color';

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

const HOVER_COLOR_DEFAULT_RATIO = 0.15;
const ACTIVE_COLOR_DEFAULT_RATIO = 0.2;

const shadeOrTintColor = (colorString: string, ratio: number) => {
  const color = Color(colorString);
  return color.isDark()
    ? color.darken(ratio).hex()
    : color.lighten(ratio).hex();
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
      '&:hover': {
        backgroundColor: shadeOrTintColor(
          props.activeBgColor,
          HOVER_COLOR_DEFAULT_RATIO
        ),
      },
      '&:active': {
        backgroundColor: shadeOrTintColor(
          props.activeBgColor,
          ACTIVE_COLOR_DEFAULT_RATIO
        ),
      },
    },
    '&.completed': {
      backgroundColor: props.completedBgColor,
      '&:hover': {
        backgroundColor: shadeOrTintColor(
          props.completedBgColor,
          HOVER_COLOR_DEFAULT_RATIO
        ),
      },
      '&:active': {
        backgroundColor: shadeOrTintColor(
          props.completedBgColor,
          ACTIVE_COLOR_DEFAULT_RATIO
        ),
      },
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

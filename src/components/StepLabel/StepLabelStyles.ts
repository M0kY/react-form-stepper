import { createUseStyles } from 'react-jss';

export const useStepLabelStyles = createUseStyles({
  LabelContainer: props => ({
    width: '100%',
    fontSize: props.fontSize,
    fontWeight: 400,
    lineHeight: 1.4,
  }),
  Label: props => ({
    display: 'block',
    marginTop: 16,
    textAlign: 'center',
    fontWeight: props.fontWeight,
  }),
});

import React from 'react';

export interface StepLabelStyleProps {
  fontSize?: React.ReactText;
  fontWeight?: React.ReactText;
  labelColor?: React.ReactText;
}

export interface StepLabelProps
  extends React.HTMLProps<HTMLDivElement>,
    StepLabelStyleProps {}

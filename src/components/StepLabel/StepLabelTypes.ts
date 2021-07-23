import React from 'react';

export interface StepLabelStyleProps {
  fontSize?: React.ReactText;
  fontWeight?: React.ReactText;
}

export interface StepLabelProps
  extends React.HTMLProps<HTMLDivElement>,
    StepLabelStyleProps {}

export interface StepState {
  active: boolean;
  completed: boolean;
}

export interface StepDTO {
  label?: string;
  active?: boolean;
  completed?: boolean;
}

export interface StepStyleDTO {
  [key: string]: any;
  activeBgColor: string;
  activeTextColor: string;
  completedBgColor: string;
  completedTextColor: string;
  inactiveBgColor: string;
  inactiveTextColor: string;
  size: React.ReactText;
  circleFontSize: React.ReactText;
  labelFontSize: React.ReactText;
  borderRadius: React.ReactText;
  fontWeight: React.ReactText;
}

export interface StepStyleProps extends StepStyleDTO, StepState {}

export interface StepProps
  extends StepDTO,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
  styleConfig?: StepStyleDTO;
  index?: number;
}

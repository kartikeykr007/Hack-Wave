import React, { ReactNode, CSSProperties } from 'react';

export interface ElectricBorderProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  color?: string;
  glowColor?: string;
  speed?: number;
  chaos?: number;
  spread?: number;
  thickness?: number;
  strands?: number;
  glow?: number;
  intensity?: number;
  arcs?: number;
  flicker?: number;
  borderRadius?: number;
  offset?: number;
  active?: boolean;
  intro?: boolean;
  interactive?: boolean;
  cursorRadius?: number;
  theme?: 'dark' | 'light';
  className?: string;
  style?: CSSProperties;
}

declare const ElectricBorder: React.FC<ElectricBorderProps>;

export default ElectricBorder;

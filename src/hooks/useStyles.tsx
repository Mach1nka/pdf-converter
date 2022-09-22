import { useMemo } from 'react';
import { StylesOverride } from '../types/types';

const useStyles = (styles: StylesOverride, deps: any[]): StylesOverride =>
  useMemo(() => styles, deps);

export default useStyles;

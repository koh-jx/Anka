import { forwardRef, Ref, ReactElement } from 'react';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

export const DialogTransition = forwardRef(function Transition(
    props: TransitionProps & {
      children: ReactElement<any, any>;
    },
    ref: Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
});
  
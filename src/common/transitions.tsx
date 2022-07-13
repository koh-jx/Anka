import { forwardRef, Ref, ReactElement, Fragment } from 'react';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import {
  Button,
} from '@mui/material';

export const DialogTransition = forwardRef(function Transition(
    props: TransitionProps & {
      children: ReactElement<any, any>;
    },
    ref: Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
});
  
export const getSnackbarActions = (closeSnackbar: any) => {
  return (key: any) => (
    <Fragment>
        <Button 
        sx={{color: "white"}}
        onClick={() => { closeSnackbar(key) }}
        >
            Dismiss
        </Button>
    </Fragment>
  );
}
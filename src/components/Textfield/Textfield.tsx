import React, { ReactElement } from 'react';
import TextField from '@mui/material/TextField';

function Textfield(
  { 
    value, setValue, label, onKeyDown = (e) => {}
  } : {
    value     : string,
    setValue  : (value: string) => void,
    label     : string
    onKeyDown ?: (e: any) => void
  }
): ReactElement {
    return (    
      <TextField
        margin="normal"
        id={label}
        label={label}
        type="text"
        fullWidth
        variant="filled"
        value={value}
        sx={{ 
          input: {
            color: 'black',
            background: 'rgba(255,255,255,0.8)',
          }
        }}
        autoComplete='off'
        autoFocus
        InputLabelProps={{
          style: { color: '#000' },
        }}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={onKeyDown}
      />
    );
}

export default Textfield;
import React, { ReactElement } from 'react';
import TextField from '@mui/material/TextField';

function Textfield(
  { 
    value, setValue, label
  } : {
    value     : string,
    setValue  : React.Dispatch<React.SetStateAction<string>>,
    label     : string
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
        InputLabelProps={{
          style: { color: '#000' },
        }}
        onChange={(e) => setValue(e.target.value)}
      />
    );
}

export default Textfield;
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';

import styles from './SideBar.module.css';

export default function SideBar(
  {
  }
  : {
  }
) {

  return (
    <Button 
      variant="contained"
      color="primary"
      sx={{
        fontSize: "2rem",
        height: "20%",
        width: "100%",
        borderRadius: "25px",
      }}
    >
      Start Test
    </Button>
  );
}
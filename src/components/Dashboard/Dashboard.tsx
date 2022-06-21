import React, { ReactElement, useState } from 'react'
import Box from '@mui/material/Box';
import DeckManager from '../DeckManager';


import styles from './Dashboard.module.css';
  
function Dashboard(): ReactElement {
    return (    
        <Box
            sx={{
                width: "100%",
                marginY: "2vh",
                minHeight: "75vh",
                backgroundColor: 'primary.light',
                borderRadius: '20px',
                boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.25)',
                padding: '4vh',
            }}
        >
            <DeckManager />
        </Box>
    );
}

export default Dashboard;
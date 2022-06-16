import React, { ReactElement } from 'react'
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";

import styles from './Login.module.css'


function Login(): ReactElement {
    return <div className={ [styles.wrapper, styles.center].join(' ') }>
      <div className={ [styles.loginBox, styles.center].join(' ') }>
        <h1>Welcome to Anka</h1>
        <form className={ [styles.form, styles.center].join(' ') }>
            <TextField
                color="primary"
                id="username"
                fullWidth
                label="Username"
                margin="normal"
                variant="filled"
                style={{ backgroundColor: 'rgba(255,255,255,1)', borderRadius: 25 }}
            />

            <TextField
                color="primary"
                id="password"
                fullWidth
                label="Password"
                type="password"
                margin="normal"
                variant="filled"
                style={{ backgroundColor: 'rgba(255,255,255,1)', borderRadius: 25 }}
            />
    
            <Button 
              color="primary"
              className={styles.button}
              type="submit"
              variant="contained"
              style={{ borderRadius: 25, color: 'white', marginLeft: 'auto', marginRight: 'auto', width: '50%' }}
            >
              Login
            </Button>
            
            <Button 
              color="secondary"
              className={styles.button}
              type="submit"
              variant="contained"
              style={{ borderRadius: 25, color: 'black', marginLeft: 'auto', marginRight: 'auto', width: '50%' }}
            >
              Create a new account
            </Button>
        </form>
      </div>
    </div>
}

export default Login;
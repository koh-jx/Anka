import React, { ReactElement, useState } from 'react'
import {
  Alert,
  Button,
  TextField,
} from '@mui/material';

import { login, registerNewUser } from '../../lib/api/login'

import styles from './Login.module.css'


function Login({ setIsLoggedIn } : { setIsLoggedIn : React.Dispatch<React.SetStateAction<boolean>>}): ReactElement {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const reset = (newRegisterState: boolean) => {
    setUsername("");
    setPassword("");
    setShowAlert(false);
    setIsRegister(newRegisterState)
  }

  const loginUser = async () => {
    await login(username, password)
      .then ((data) => {
        setIsLoggedIn(true);
        console.log(data);
        //put jwt in local storage
      }).catch((err : any) => {
        setShowAlert(true);
        setAlertMessage("Invalid email or password");
      }
    );
  }

  const registerUser = async () => {
    await registerNewUser(username, password)
      .then ((data) => {
        setIsLoggedIn(true);
      }).catch((err : any) => {
        console.log(err);
        setShowAlert(true);
        setAlertMessage(err.message);
      }
    );
  }

  return <div className={ [styles.wrapper, styles.center].join(' ') }>
    <div className={ [styles.loginBox, styles.center].join(' ') }>
      <h1 className={styles.title}>Welcome to Anka</h1>
      <form className={ [styles.form, styles.center].join(' ') }>
          <TextField
              color="primary"
              id="username"
              fullWidth
              label="Username"
              margin="normal"
              variant="filled"
              value={username}
              style={{ backgroundColor: 'rgba(255,255,255,1)', fontFamily: 'Staatliches' }}
              onChange={(e) => setUsername(e.target.value)}
          />

          <TextField
              color="primary"
              id="password"
              fullWidth
              label="Password"
              type="password"
              margin="normal"
              variant="filled"
              value={password}
              style={{ backgroundColor: 'rgba(255,255,255,1)', fontFamily: 'Staatliches' }}
              onChange={(e) => setPassword(e.target.value)}
          />

          {showAlert && (
            <Alert severity="error">{alertMessage}</Alert>
          )}

          {isRegister && (
            <>
              <Button 
                color="primary"
                variant="contained"
                style={{ 
                  borderRadius: 25, 
                  color: 'white', 
                  marginLeft: 'auto', 
                  marginRight: 'auto', 
                  width: '50%', 
                  fontFamily: 'Roboto', 
                  fontWeight: 'bold' 
                }}
                onClick={registerUser}
              >
                Create account
              </Button>

              <Button 
                color="secondary"
                className={styles.button}
                variant="contained"
                style={{ 
                  borderRadius: 25, 
                  color: 'black', 
                  marginLeft: 'auto', 
                  marginRight: 'auto', 
                  width: '50%', 
                  fontFamily: 'Roboto', 
                  fontWeight: 'bold',
                  whiteSpace: 'nowrap'
                }}
                onClick={() => reset(false)}
              >
                Back
              </Button>
            </>
          )}
  
          {!isRegister && (
            <>
              <Button 
                color="primary"
                variant="contained"
                style={{ 
                  borderRadius: 25, 
                  color: 'white', 
                  marginLeft: 'auto', 
                  marginRight: 'auto', 
                  width: '50%', 
                  fontFamily: 'Roboto', 
                  fontWeight: 'bold',
                  whiteSpace: 'nowrap'
                }}
                onClick={loginUser}
              >
                Login
              </Button>
              
              <Button 
                color="secondary"
                className={styles.button}
                variant="contained"
                style={{ 
                  borderRadius: 25, 
                  color: 'black', 
                  marginLeft: 'auto', 
                  marginRight: 'auto', 
                  width: '50%', 
                  fontFamily: 'Roboto', 
                  fontWeight: 'bold',
                  whiteSpace: 'nowrap'
                }}
                onClick={() => reset(true)}
              >
                Create a new account
              </Button>
            </>
          )}
      </form>
    </div>
  </div>
}

export default Login;
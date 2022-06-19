import React, { ReactElement, useState } from 'react'
import {
  Alert,
  Button,
  TextField,
} from '@mui/material';

import { login, registerNewUser, setJwtToLocalStorage } from '../../lib/api/login'

import styles from './Login.module.css'


function Login(
  { setIsLoggedIn } : { setIsLoggedIn : React.Dispatch<React.SetStateAction<boolean>>}
): ReactElement {
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
        //put jwt in local storage
        setJwtToLocalStorage(data.access_token);
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
        setShowAlert(true);
        setAlertMessage(err.message);
      }
    );
  }

  const keyPressSubmit = (e: any) => {
    if(e.keyCode === 13){
      if(isRegister){
        registerUser();
      } else {
        loginUser();
      }
   }
  }

  return <div className={ [styles.wrapper, styles.center].join(' ') }>
    <div className={ window.localStorage.getItem('mode') === 'light'
        ? [styles.loginBox, styles.center].join(' ')
        : [styles.loginBoxDark, styles.center].join(' ')
      }>
      <h1 className={styles.title}>Welcome to Anka</h1>
      <form className={ [styles.form, styles.center].join(' ') }>
          <TextField
              id="username"
              fullWidth
              label="Username"
              margin="normal"
              variant="filled"
              value={username}
              sx={{ 
                fontFamily: 'Staatliches',
                color: 'black',
                input: {
                  color: 'black',
                  background: 'rgba(255,255,255,0.8)',
                }
              }}
              InputLabelProps={{
                style: { color: '#000' },
              }}
              onChange={(e) => setUsername(e.target.value)}
          />

          <TextField
              id="password"
              fullWidth
              label="Password"
              type="password"
              variant="filled"
              value={password}
              sx={{ 
                fontFamily: 'Staatliches',
                color: 'black',
                input: {
                  color: 'black',
                  background: 'rgba(255,255,255,0.8)',
                }
              }}
              InputLabelProps={{
                style: { color: '#000' },
              }}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={keyPressSubmit}
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
                  marginLeft: 'auto', 
                  marginRight: 'auto', 
                  width: '50%', 
                  fontFamily: 'Roboto', 
                  fontWeight: 'bold',
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
                  marginLeft: 'auto', 
                  marginRight: 'auto', 
                  width: '50%', 
                  fontFamily: 'Roboto', 
                  fontWeight: 'bold',
                  whiteSpace: 'nowrap',
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
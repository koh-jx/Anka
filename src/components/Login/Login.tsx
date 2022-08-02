import React, { ReactElement, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {
  Alert,
  Button,
  Box,
  TextField,
  InputAdornment,
  IconButton,
  CircularProgress
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import Textfield from '../Textfield';
import { login, registerNewUser, setJwtToLocalStorage } from '../../lib/api/login'
import { resetAnkaApi } from '../../lib/api/axios';

import styles from './Login.module.css'


function Login(
  { setIsLoggedIn } : { setIsLoggedIn : React.Dispatch<React.SetStateAction<boolean>>}
): ReactElement {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const reset = (newRegisterState: boolean) => {
    setUsername("");
    setPassword("");
    setShowAlert(false);
    setIsRegister(newRegisterState)
  }

  const loginUser = async () => {
    setIsLoading(true);
    await login(username, password)
      .then ((data) => {
        setIsLoggedIn(true);
        //put jwt in local storage
        setJwtToLocalStorage(data.access_token);
        resetAnkaApi();
        navigate('/');
        setIsLoading(false);
      }).catch((err : any) => {
        console.error(err);
        setIsLoading(false);
        setShowAlert(true);
        setAlertMessage("Invalid email or password");
      }
    );
  }

  const registerUser = async () => {
    setIsLoading(true);
    await registerNewUser(username, password)
      .then (() => { loginUser(); })
      .catch((err : any) => {
        console.error(err);
        setIsLoading(false);
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
    <Box
      sx={{
        backgroundColor: "primary.light",
        width: "50%",
        padding: "60px",
        borderRadius: "20px",
        boxShadow: "0px 10px 15px -10px #000",
      }}
    >
      <h1 className={styles.title}>Welcome to Anka</h1>
      <form className={ [styles.form, styles.center].join(' ') }>
          <Textfield value={username} setValue={setUsername} label="Username" />

          <TextField
              id="password"
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="filled"
              value={password}
              sx={{ 
                input: {
                  color: 'black',
                  background: 'rgba(255,255,255,0.8)',
                }
              }}
              InputLabelProps={{
                style: { color: '#000' },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onMouseDown={handleMouseDownPassword}
                      onMouseUp={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={keyPressSubmit}
          />

          {showAlert && (
            <Alert severity="error">{alertMessage}</Alert>
          )}

          {isRegister && (
            <>
              <Box sx={{ position: 'relative' }}>
                <Button 
                  color="primary"
                  variant="contained"
                  style={{ 
                    borderRadius: 25, 
                    left: "25%",
                    width: '50%', 
                  }}
                  onClick={registerUser}
                >
                  Create account
                </Button>
                {isLoading && (
                  <CircularProgress
                    size={24}
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      marginTop: '-12px',
                      marginLeft: '-12px',
                    }}
                  />
                )}
              </Box>

              <Button 
                color="secondary"
                variant="contained"
                style={{ 
                  borderRadius: 25, 
                  marginLeft: 'auto', 
                  marginRight: 'auto', 
                  width: '50%', 
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
              <Box sx={{ position: 'relative' }}>
                <Button 
                  color="primary"
                  variant="contained"
                  style={{ 
                    borderRadius: 25, 
                    left: "25%",
                    width: '50%', 
                    whiteSpace: 'nowrap'
                  }}
                  disabled={isLoading}
                  onClick={loginUser}
                >
                  Login
                </Button>
                {isLoading && (
                  <CircularProgress
                    size={24}
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      marginTop: '-12px',
                      marginLeft: '-12px',
                    }}
                  />
                )}
              </Box>
              
              <Button 
                color="secondary"
                className={styles.button}
                variant="contained"
                style={{ 
                  borderRadius: 25, 
                  marginLeft: 'auto', 
                  marginRight: 'auto', 
                  width: '50%', 
                  whiteSpace: 'nowrap'
                }}
                onClick={() => reset(true)}
              >
                Create a new account
              </Button>
            </>
          )}
      </form>
    </Box>
  </div>
}

export default Login;
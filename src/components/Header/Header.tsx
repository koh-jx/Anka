import React, { ReactElement } from 'react'

import styles from './Header.module.css';
import logo from '../../assets/logo.png';
import logoDark from '../../assets/logoDark.png';

import { logout } from '../../lib/api/login';
import { Button } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
 
function Header(
    { 
        isLoggedIn, 
        setIsLoggedIn, 
        setMode,
    } 
    : 
    {
        isLoggedIn: boolean, 
        setIsLoggedIn : React.Dispatch<React.SetStateAction<boolean>>,
        setMode: React.Dispatch<React.SetStateAction<'light' | 'dark'>>,
    }
): ReactElement {

    // const navigate = useNavigate();
    
    const logoutUser = async () => {
        await logout()
            .then(() => {
                setIsLoggedIn(false);
            }
        );
    }

    return (
        <div className={window.localStorage.getItem('mode') === 'light' ? styles.header : styles.headerDark}>
            <img
                className={[styles.logo, styles.animateLogo, isLoggedIn && styles.shiftLogo].join(' ')}
                src={window.localStorage.getItem('mode') === 'light' ? logo : logoDark}
                alt="Anka"
                onClick={() => setMode(window.localStorage.getItem('mode') === 'light' ? 'dark' : 'light')}
                role="button"
            />

            {isLoggedIn && 
                <div className={[styles.menuBar, isLoggedIn && styles.fadeIn].join(' ')}>
                    <Button 
                        style={{ 
                            fontSize: '1.2rem',
                            position: 'fixed',
                            right: '70%',
                            top: '5%',
                            width: '10%',
                            color: 'white',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        Your sets
                    </Button>
                    <Button 
                        style={{ 
                            fontSize: '1.2rem',
                            position: 'fixed',
                            right: '50%',
                            top: '5%',
                            width: '10%',
                            color: 'white',
                            whiteSpace: 'nowrap'
                            // onClick={() => navigate('/')}
                        }}
                    >
                        Your notes
                    </Button>
                    <Button 
                        color="secondary"
                        variant="contained"
                        style={{ 
                            position: 'fixed',
                            right: '10%',
                            top: '5%',
                            color: 'secondary',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        Select Pack
                    </Button>
                    {/* // To change to menu dropdown once more functions are added (profile?)*/}
                    <Button 
                        color="secondary"
                        variant="contained"
                        style={{ 
                            position: 'fixed',
                            right: '3%',
                            top: '5%',
                            // width: '5%',
                            color: 'secondary',
                            whiteSpace: 'nowrap'
                        }}
                        onClick={logoutUser}
                    >
                        Logout
                    </Button>
                </div>
            }
        </div>
    );
}

export default Header;
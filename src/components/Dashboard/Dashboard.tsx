import { Button } from '@mui/material';
import React, { ReactElement } from 'react'

import { logout } from '../../lib/api/login';
 
function Dashboard(
    { setIsLoggedIn } : { setIsLoggedIn : React.Dispatch<React.SetStateAction<boolean>>}
): ReactElement {

    const logoutUser = async () => {
        await logout()
            .then(() => {
                setIsLoggedIn(false);
            }
        );
    }

    return (
        <div>
            <Button
                onClick = {logoutUser}
            >
                Logout
            </Button>

        </div>
    );
}

export default Dashboard;
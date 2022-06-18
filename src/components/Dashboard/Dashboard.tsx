import { Button } from '@mui/material';
import React, { ReactElement } from 'react'

import { logout } from '../../lib/api/login';
 
function Dashboard(): ReactElement {
    return (
        <div>
            <Button
                onClick = {logout}
            >
                Logout
            </Button>

        </div>
    );
}

export default Dashboard;
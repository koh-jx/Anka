import { useNavigate } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import styles from './BackArrow.module.css';


export default function BackArrow({ showBackArrow } : { showBackArrow: boolean }) {
    const navigate = useNavigate();
    return (
        <>
            { showBackArrow && <ArrowBackIosNewIcon 
                className={styles.cardSettingsIcon}
                sx={{
                    color: "text.secondary",
                    width: '1.25rem',
                    height: '2rem',
                }} 
                onClick={() => navigate(-1)}
            /> }
            { !showBackArrow && <div className={styles.emptyBackArrow}></div> }
        </>
    );
}
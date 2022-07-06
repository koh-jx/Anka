import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import PageNavigation from '../PageNavigation';

import styles from './TopBar.module.css';


export default function TopBar(
  {
    title,
    showBackArrow,
    pageNumber,
    setPageNumber,
    totalPages,
  }
  : {
    title: string,
    showBackArrow: boolean,
    pageNumber: number,
    setPageNumber: React.Dispatch<React.SetStateAction<number>>,
    totalPages: number,
  }
) {

    const navigate = useNavigate();
    return (
        <div className={styles.topBar}>
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
            <Typography
                color="text.secondary"
                variant="h5"
                sx={{
                    paddingLeft: '1rem',
                }}
            >
                {title}
            </Typography> 
            {/* Page Navigation */}
            <div className={styles.navigation}>
                <PageNavigation
                    pageNumber={pageNumber}
                    totalPages={totalPages}
                    setPageNumber={setPageNumber}
                />
            </div>
            
        </div>
    );
}
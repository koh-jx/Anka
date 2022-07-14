import { Typography } from '@mui/material';
import PageNavigation from '../PageNavigation';
import BackArrow from '../BackArrow';

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
    return (
        <div className={styles.topBar}>
            <BackArrow showBackArrow={showBackArrow}/>
            <Typography
                color="text.secondary"
                variant="h5"
                sx={{
                    paddingLeft: '1rem',
                    width: '20%',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
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
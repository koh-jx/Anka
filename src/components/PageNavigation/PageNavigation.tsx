import { Typography } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

import styles from './PageNavigation.module.css';


export default function PageNavigation(
  {
    pageNumber,
    setPageNumber,
    totalPages,
  }
  : {
    pageNumber: number,
    setPageNumber: React.Dispatch<React.SetStateAction<number>>,
    totalPages: number,
  }
) {

  return (
    <div className={styles.pageNavigation}>
      { pageNumber !== 1 && <>
          <KeyboardDoubleArrowLeftIcon 
              className={styles.cardSettingsIcon}
              sx={{
                  color: "text.secondary",
                  width: '2rem',
                  height: '2rem',
              }} 
              onClick={() => {
                  setPageNumber(1);
              }}
          />
          <NavigateBeforeIcon 
              className={styles.cardSettingsIcon}
              sx={{
                  color: "text.secondary",
                  width: '2rem',
                  height: '2rem',
              }} 
              onClick={() => {
                  setPageNumber(pageNumber - 1);
              }}
          />
      </> }
      { pageNumber === 1 && <div className={styles.emptyNavigationSide}></div> }

      <Typography
          color="text.secondary"
          variant="h5"
      >
          Page {pageNumber} of {totalPages}
      </Typography> 
      
      {pageNumber !== totalPages && <>
          <NavigateNextIcon 
              className={styles.cardSettingsIcon}
              sx={{
                  color: "text.secondary",
                  width: '2rem',
                  height: '2rem',
              }} 
              onClick={() => {
                  setPageNumber(pageNumber + 1);
              }}
          />
          <KeyboardDoubleArrowRightIcon 
              className={styles.cardSettingsIcon}
              sx={{
                  color: "text.secondary",
                  width: '2rem',
                  height: '2rem',
              }} 
              onClick={() => {
                  setPageNumber(totalPages);
              }}
          />
      </> }
      { pageNumber === totalPages && <div className={styles.emptyNavigationSide}></div> }
  </div>
  );
}
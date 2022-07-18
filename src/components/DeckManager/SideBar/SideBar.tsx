import { ReactElement, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  ButtonGroup,
  Paper,
  Grow,
  ClickAwayListener,
  MenuList,
  Popper,
  MenuItem,
  Typography,
 } from '@mui/material';
 import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { getDeckApi } from '../../../lib/api/deckFunctions';

// import styles from './SideBar.module.css';

export default function SideBar(
  { deckId, numCards, dueForReviewCount } 
  : { deckId: string, numCards: number, dueForReviewCount: number }
) : ReactElement {

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  const startDailyReview = async () => {
    const deck = await getDeckApi(deckId);
    navigate(`/test`, {
      state: { 
        deckId: deck.id,
        isDailyReview: true,
      }
    });
  };

  const testAllCards = async () => {
    const deck = await getDeckApi(deckId);
    navigate(`/test`, {
      state: { 
        deckId: deck.id,
        isDailyReview: false,
      }
    });
  }

  return (
    <>
      <ButtonGroup ref={anchorRef} 
        sx={{ 
          width: "100%", 
          height: "100%",
          maxHeight: 50,
        }}
        disabled={numCards === 0}  
      >
        <Button 
          variant="contained"
          color="primary"
          sx={{
            width: "80%",
            fontSize: "1.8rem",
            borderRadius: "30px",
          }}
          onClick={startDailyReview}
          disabled={dueForReviewCount === 0}
        >
          Start Daily Review
        </Button>
        <Button
            variant="contained"
            onClick={handleToggle}
            color="primary"
            sx={{
              width: "20%",
              fontSize: "2rem",
              borderRadius: "30px",
            }}
          >
            <ArrowDropDownIcon />
          </Button>
      </ButtonGroup>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        placement="bottom-end"
        transition
        disablePortal
      >
        {({ TransitionProps }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: 'center top' }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                    {/* <MenuItem
                      sx={{ color: "black" }}
                      onClick={testSelectedCards}
                    >
                      Select Cards to Practice
                    </MenuItem> */}
                    <MenuItem
                      sx={{ color: "black" }}
                      onClick={testAllCards}
                    >
                      Practice all cards
                    </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
      <Typography
          color="text.secondary"
          variant="h6"
          sx={{
            padding: "1rem",
          }}
      >
          You have {dueForReviewCount} {dueForReviewCount === 1 ? "card" : "cards"} pending review
      </Typography>
    </>
  );
}
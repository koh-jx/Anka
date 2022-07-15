import { useState, useRef } from 'react';
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
 } from '@mui/material';
 import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { getDeckApi } from '../../../lib/api/deckFunctions';

// import styles from './SideBar.module.css';

export default function SideBar({ deckId, numCards } : { deckId: string, numCards: number }) {

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    console.info(`Start test`);
  };

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

  const testSelectedCards = () => {
    console.info("Test selected cards");
  }

  const testAllCards = async () => {
    const deck = await getDeckApi(deckId);
    navigate(`/test`, {
      state: { cardIds: deck.cards }
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
            fontSize: "2rem",
            borderRadius: "30px",
          }}
          onClick={handleClick}
        >
          Start Test
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
                    <MenuItem
                      onClick={testSelectedCards}
                    >
                      Select Cards to Test
                    </MenuItem>
                    <MenuItem
                      onClick={testAllCards}
                    >
                      Test using all cards
                    </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
}
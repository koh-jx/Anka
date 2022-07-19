import { ReactElement, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  ButtonGroup,
  Typography,
 } from '@mui/material';
import { getDeckApi } from '../../../lib/api/deckFunctions';

// import styles from './SideBar.module.css';

export default function SideBar(
  { deckId, numCards, dueForReviewCount } 
  : { deckId: string, numCards: number, dueForReviewCount: number }
) : ReactElement {

  const navigate = useNavigate();
  const anchorRef = useRef<HTMLDivElement>(null);

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
            width: "50%",
            fontSize: "1.2rem",
            borderRadius: "30px",
          }}
          onClick={startDailyReview}
          disabled={dueForReviewCount === 0}
        >
          Start Daily Review
        </Button>
        <Button
            variant="contained"
            onClick={testAllCards}
            color="primary"
            sx={{
              width: "50%",
              fontSize: "1.2rem",
              borderRadius: "30px",
            }}
          >
            Practice All Cards
        </Button>
      </ButtonGroup>
      <Typography
          color="text.secondary"
          variant="h6"
          sx={{
            padding: "1rem",
          }}
      >
          {dueForReviewCount !== 0 && `You have ${dueForReviewCount} ${dueForReviewCount === 1 ? "card" : "cards"} pending review`}
          {dueForReviewCount === 0 && `No cards to review! Try a practice session!`}
      </Typography>
    </>
  );
}
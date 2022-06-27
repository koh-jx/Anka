import React, { ReactElement, useState } from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Typography } from '@mui/material';

import { CardType } from '../Card/CardFactory';
import AddDeckDialog from './AddDeckDialog';

import styles from './MyDecks.module.css';
import { useNavigate } from 'react-router-dom';


export type DeckType = {
    id: string;
    name: string;
    // picture: ???;
    cards: CardType[];
}
  
function MyDecks(): ReactElement {
    const navigate = useNavigate();
    // Currently is an array of array of cards
    // Change to array of decks ids, then when enter DeckManager then call the getDeck api
    const [decks, setDecks] = useState<DeckType[]>([]);
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleClickClose = (deckToAdd : DeckType | null) => {
        if (deckToAdd) {
            setDecks([...decks, deckToAdd]);
        }

        setDialogOpen(false);
    }

    const handleClickOpen = () => {
        setDialogOpen(true);
    }

    // Once read different decks then uncomment this
    const gotoDeck = (deck: DeckType) => {
        // navigate(`/deck/${deck.id}`, {
        //     state: {
        //         deck
        //     }
        // });
        navigate(`/deck`);
    }

    const removeDeck = (deck: DeckType) => {
        setDecks(decks.filter(d => d.id !== deck.id));
    }

    return ( 
        <>
            <Typography
                color="text.secondary"
                variant="h5"
                sx={{
                    paddingLeft: '1rem',
                }}
            >
                Your Decks
            </Typography> 
            <div className={styles.deckManager}>
                <div className={styles.gridContainer}>
                    { decks.map((deck, index) => (
                        <div className={styles.gridItem} key={index}>
                            <div 
                                className={styles.deck}
                                onClick={() => gotoDeck(deck)}
                            >
                                <Typography
                                    color="text.secondary"
                                    variant="h4"
                                    sx={{
                                        textShadow: '3px 2px 2px rgba(0, 0, 0, 0.25)',
                                    }}
                                >
                                    {deck.name}
                                </Typography>
                                <Typography
                                    className={styles.subText}
                                    color="text.secondary"
                                    variant="h6"
                                >
                                    {deck.cards.length} cards
                                </Typography>  
                            </div>
                        </div>
                    )) }
                    <div className={styles.gridItem}>
                        <div 
                            className={styles.card}
                            onClick={handleClickOpen}
                        >
                            <AddCircleIcon sx={{ 
                                fontSize: '6rem',
                                color: 'rgb(0,0,0,0.3)'
                            }}/>
                        </div>
                        <AddDeckDialog 
                            dialogOpen={dialogOpen} 
                            handleClose={handleClickClose} 
                            undo={removeDeck}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default MyDecks;
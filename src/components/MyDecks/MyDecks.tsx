import React, { ReactElement, useState } from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Typography } from '@mui/material';

import DeckManager from '../DeckManager';
import { CardType } from '../Card/CardFactory';

import styles from './MyDecks.module.css';
import { useNavigate } from 'react-router-dom';


export type Deck = {
    id: string;
    name: string;
    // picture: ???;
    cards: CardType[];
}
  
function MyDecks(): ReactElement {
    const navigate = useNavigate();
    // Currently is an array of array of cards
    // Change to array of decks ids, then when enter DeckManager then call the getDeck api
    const [decks, setDecks] = useState<Deck[]>([]);

    const handleClickOpen = () => {
        setDecks([...decks, {
            id: '',
            name: 'Deck',
            cards: []
        }]);
    }

    const gotoDeck = (deck: Deck) => {
        // navigate(`/deck/${deck.id}`, {
        //     state: {
        //         deck
        //     }
        // });
        navigate(`/deck`);
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
                        {/* <AddCardDialog 
                            dialogOpen={dialogOpen} 
                            handleClose={handleClickClose} 
                            undo={removeCard}
                            editObject={editObject}
                            setEditObject={setEditObject}
                            editHandleClose={handleEditClickClose}
                            editUndo={undoEditCard}
                        /> */}
                    </div>
                </div>
            </div>
        </>
    );
}

export default MyDecks;
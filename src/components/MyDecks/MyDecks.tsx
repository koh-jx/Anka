import React, { ReactElement, useState,  useEffect, Fragment } from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    Button,
    Typography
} from '@mui/material';
import { useSnackbar } from 'notistack';

import AddDeckDialog from './AddDeckDialog';
import { 
    createDeckApi, 
    getUserDecksApi, 
    editDeckApi, 
    deleteDeckApi 
} from '../../lib/api/deckFunctions';

import styles from './MyDecks.module.css';
import { useNavigate } from 'react-router-dom';


export type DeckType = {
    id: string;
    name: string;
    // picture: ???;
    cards: string[];
}
  
function MyDecks(): ReactElement {
    const navigate = useNavigate();
    // Currently is an array of array of cards
    // Change to array of decks ids, then when enter DeckManager then call the getDeck api
    const [decks, setDecks] = useState<DeckType[]>([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    // To edit a deck
    const [editObject, setEditObject] = useState<DeckType | null>(null); 
    // Snackbar
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    // Dialog that opens when you click on the add deck button
    const handleClickOpen = () => {
        setDialogOpen(true);
    }

    useEffect(() => {
        getUserDecksApi()
            .then(decks => {
                setDecks(decks);
            })
    }, [])

    // Close the dialog and add the deck
    const handleClickClose = (deckToAdd : DeckType | null) => {
        if (deckToAdd) {
            createDeckApi(deckToAdd)
                .then((deck) => {
                    setDecks([...decks, deck]);
            
                    const action = (key: any) => (
                        <Fragment>
                            <Button 
                            sx={{color: "white"}}
                            onClick={() => { closeSnackbar(key) }}
                            >
                                Dismiss
                            </Button>
                        </Fragment>
                    );
                
                    enqueueSnackbar('Deck created!', { 
                        variant: 'success',
                        autoHideDuration: 1500,
                        action
                    });
                })
        }

        setDialogOpen(false);
    }

    // Remove a deck
    const removeDeck = (deck: DeckType) => {
        deleteDeckApi(deck)
            .then(() => {
                setDecks(decks.filter(d => d.id !== deck.id));
                const action = (key: any) => (
                    <Fragment>
                        <Button 
                        sx={{color: "white"}}
                        onClick={() => { closeSnackbar(key) }}
                        >
                            Dismiss
                        </Button>
                    </Fragment>
                );
                
                enqueueSnackbar('Deck deleted!', { 
                    variant: 'error',
                    autoHideDuration: 1500,
                    action
                });
            })
    }

    // Edit deck dialog
    const editDeck = (deck: DeckType) => {
        setEditObject(deck);
        setDialogOpen(true);
    }

    // Close the edit deck dialog and edits the deck
    const handleEditClickClose = (toEdit: DeckType | null) => {
        if (toEdit) {
            editDeckApi(toEdit)
                .then(() => {
                    setDecks(decks.map(deck => deck.id === toEdit.id ? toEdit : deck));
                    const action = (key: any) => (
                        <Fragment>
                            <Button 
                            sx={{color: "white"}}
                            onClick={() => { closeSnackbar(key) }}
                            >
                                Dismiss
                            </Button>
                        </Fragment>
                    );
                    
                    enqueueSnackbar('Deck edited!', { 
                        variant: 'info',
                        autoHideDuration: 1500,
                        action
                    });
                })
        }
        setEditObject(null);
        setDialogOpen(false);
    }

    // Once read different decks then uncomment this
    const gotoDeck = (deck: DeckType) => {
        navigate(`/deck`, {
            state: {
                id: deck.id,
                name: deck.name,
                cards: deck.cards,
            }
        });
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
                                    {deck.cards.length} {deck.cards.length === 1 ? 'card' : 'cards'}
                                </Typography>  
                                <div>
                                    <ModeEditIcon 
                                        className={styles.cardSettingsIcon}
                                        sx={{color: "text.secondary"}} 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            editDeck(deck)
                                        }}
                                    />
                                    <DeleteIcon 
                                        className={styles.cardSettingsIcon} 
                                        sx={{color: "text.secondary"}} 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            removeDeck(deck);
                                        }}   
                                    />
                                </div>
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
                            editObject={editObject}
                            setEditObject={setEditObject}
                            editHandleClose={handleEditClickClose}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default MyDecks;
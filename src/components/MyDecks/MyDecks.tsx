import { ReactElement, useState,  useEffect, Fragment } from 'react'
import { useNavigate } from 'react-router-dom';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    Button,
    Typography
} from '@mui/material';
import { useSnackbar } from 'notistack';

import TopBar from '../TopBar';
import AddDeckDialog from './AddDeckDialog';
import { 
    createDeckApi, 
    getUserDecksApi, 
    editDeckApi, 
    deleteDeckApi 
} from '../../lib/api/deckFunctions';
import { getUserApi } from '../../lib/api/cardFunctions';

import styles from './MyDecks.module.css';

export type DeckType = {
    id: string;
    name: string;
    // picture: ???;
    cards: string[];
}
  
function MyDecks(): ReactElement {
    const navigate = useNavigate();
    // UseStates
    const [decks, setDecks] = useState<DeckType[]>([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [numDecks, setNumDecks] = useState(0);
    const [editObject, setEditObject] = useState<DeckType | null>(null); 
    // Snackbar
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    // Initialise total decks, useEffect to set totalPages will be triggered
    useEffect(() => {
        getUserApi().then(user => {
            if (user) {
                setNumDecks(user.decks.length);
            }
        });
    }, [])

    // API call whenever page number is changed
    useEffect(() => {
        getUserDecksApi(pageNumber).then(decks => {
            console.log(decks)
            setDecks(decks);
        });
    }, [pageNumber]);

    // Update the total number of pages when the total number of decks change
    // If just nice number of cards is divisible by 12, then add extra page for add deck button
    useEffect(() => {
        setTotalPages(numDecks % 12 === 0 ? Math.ceil(numDecks / 12) + 1 : Math.ceil(numDecks / 12));
    }, [numDecks]);

    // Dialog that opens when you click on the add deck button
    const handleClickOpen = () => {
        setDialogOpen(true);
    }

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

                    // Set number of cards, updating totalPages in the useEffect
                    setNumDecks(numDecks + 1);
                
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
    const handleDelete = (deck: DeckType) => {
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

                // Set number of cards, updating totalPages in the useEffect
                setNumDecks(numDecks - 1);
                
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
            }
        });
    }

    return ( 
        <>
            <TopBar 
                title="Your Decks"
                showBackArrow={false} 
                pageNumber={pageNumber}
                setPageNumber={setPageNumber}
                totalPages={totalPages}
            />
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
                                            handleDelete(deck);
                                        }}   
                                    />
                                </div>
                            </div>
                        </div>
                    )) }
                    { decks.length < 12 && <div className={styles.gridItem}>
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
                    </div> }
                </div>
            </div>
        </>
    );
}

export default MyDecks;
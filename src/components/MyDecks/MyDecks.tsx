import { ReactElement, useState,  useEffect, Fragment } from 'react'
import { useNavigate } from 'react-router-dom';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
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
import { getUserApi, removeCardByIdApi } from '../../lib/api/cardFunctions';
import { NUM_DECKS_PER_PAGE } from '../../common/constants';
import { DeckType } from '../../common/types';

import styles from './MyDecks.module.css';
import DeleteDeckDialog from './DeleteDeckDialog';

function MyDecks(): ReactElement {
    const navigate = useNavigate();
    // UseStates
    const [decks, setDecks] = useState<DeckType[]>([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [numDecks, setNumDecks] = useState(0);
    const [editObject, setEditObject] = useState<DeckType | null>(null); 
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deckToDelete, setDeckToDelete] = useState<DeckType | null>(null);
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
            setDecks(decks);
        });
    }, [pageNumber]);

    // Update the total number of pages when the total number of decks change
    // If just nice number of cards is divisible by num_decks_per_page, then add extra page for add deck button
    useEffect(() => {
        setTotalPages(numDecks % NUM_DECKS_PER_PAGE === 0 
            ? Math.ceil(numDecks / NUM_DECKS_PER_PAGE) + 1 
            : Math.ceil(numDecks / NUM_DECKS_PER_PAGE)
        );
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

    const handleDeleteDialogOpen = (deckToDelete : DeckType | null) => {
        setDeckToDelete(deckToDelete);
        setDeleteDialogOpen(true);
    }

    // Remove a deck
    const handleDelete = (isDeleteAllCards: boolean) => {
        setDeleteDialogOpen(false);
        if (!deckToDelete) return;

        deleteDeckApi(deckToDelete)
            .then((deckDeleted) => {
                
                if (isDeleteAllCards) {
                    deckDeleted.cards.forEach(async (cardId) => {
                        removeCardByIdApi(cardId)
                    })
                }

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
                getUserDecksApi(pageNumber).then(decks => {
                    setDecks(decks);
                });
                
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
                                <Box
                                    sx={{
                                        width: "100%",
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                    }}
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
                                </Box>
                                
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
                                            handleDeleteDialogOpen(deck);
                                        }}   
                                    />
                                </div>
                            </div>
                        </div>
                    )) }
                    { decks.length < NUM_DECKS_PER_PAGE && <div className={styles.gridItem}>
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
                    <DeleteDeckDialog
                        deleteDialogOpen={deleteDialogOpen}
                        setDeleteDialogOpen={setDeleteDialogOpen}
                        handleDeleteClickClose={handleDelete}
                    />
                </div>
            </div>
        </>
    );
}

export default MyDecks;
import { ReactElement, useState, useEffect, Fragment, forwardRef, Ref } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import DeleteIcon from '@mui/icons-material/Delete';
import { Typography, Dialog, DialogActions, DialogTitle, Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { useSnackbar } from 'notistack';

import { createCard, CardType } from '../Card/CardFactory';
import { DeckType } from '../MyDecks/MyDecks';
import AddCardDialog from './AddCardDialog';


import styles from './DeckManager.module.css';
import { 
    editCardApi,
    removeCardApi, 
} from '../../lib/api/cardFunctions';
import { 
    createCardToDeckApi,
    removeCardFromDeckApi,
    getCardsFromDeckIdApi,
} from '../../lib/api/deckFunctions';
import { Button } from '@mui/material';
  

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
      children: ReactElement<any, any>;
    },
    ref: Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

function DeckManager(): ReactElement {
    // Get deck information
    const location = useLocation();
    const deckName = (location.state as DeckType).name;
    const deckId = (location.state as DeckType).id;
    const deckCards = (location.state as DeckType).cards;
    const navigate = useNavigate();

    const [dialogOpen, setDialogOpen] = useState(false);
    const [cards, setCards] = useState<CardType[]>([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [numCards, setNumCards] = useState(deckCards.length);

    // To edit a card
    const [editObject, setEditObject] = useState<CardType | null>(null);           // The original card before edit (for dialog)     
    
    // To choose to delete from deck, or delete card totally
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleteObject, setDeleteObject] = useState<CardType | null>(null);       // The original card before delete (for dialog)
    
    // Snackbar
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    // Initialise the number of cards (and total pages) and card data for the first page
    useEffect(() => {
        setNumCards(deckCards.length);
        setPageNumber(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // API call whenever page number is changed
    useEffect(() => {
        getCardsFromDeckIdApi(deckId, pageNumber)
            .then(cards => {
                // console.log(cards);
                setCards(cards)
            });
    }, [pageNumber, deckId]);

    // Update the total number of pages when the total number of cards change
    useEffect(() => {
        setTotalPages(Math.ceil(numCards / 12));
    }, [numCards]);
    
    // To open the dialog when adding card
    const handleClickOpen = () => {
        setDialogOpen(true);
    }

    // To close dialog after adding card
    // Card will be processed using the api, the resultant card data along with the id will
    // then be added to the cards array, and the snackbar to undo will be displayed
    // If cancel the adding, toAdd will be null and the dialog will close
    const handleClickClose = (toAdd: CardType | null) => {
        if (toAdd) {
            createCardToDeckApi(toAdd, deckId)
                .then(result => {
                    setCards([...cards, result]);
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
                    
                    // Set number of cards, updating totalNum in the useEffect
                    setNumCards(numCards + 1);
                    
                    enqueueSnackbar('Flashcard created!', { 
                        variant: 'success',
                        autoHideDuration: 1500,
                        action
                    });
                });            

        }
        setDialogOpen(false);
    }

    // Remove card, also functions as undo add
    const removeCard = () => {
        if (deleteObject) {
            removeCardFromDeckApi(deleteObject, deckId).then(() => {
                setCards(cards.filter(card => {
                    return card.id !== deleteObject.id
                }));
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
                
                enqueueSnackbar('Flashcard deleted!', { 
                    variant: 'error',
                    autoHideDuration: 1500,
                    action
                });
            });
        }
        setDeleteDialogOpen(false);
    }

    // Delete card
    const deleteCard = () => {
        if (deleteObject) {
            removeCardApi(deleteObject).then(() => {
                setCards(cards.filter(card => {
                    return card.id !== deleteObject.id
                }));
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
                
                enqueueSnackbar('Flashcard deleted!', { 
                    variant: 'error',
                    autoHideDuration: 1500,
                    action
                });
            });
        }
        setDeleteDialogOpen(false);
    }

    // To open the dialog to edit a card
    const editCard = (cardToEdit : CardType) => {
        setEditObject(cardToEdit);
        setDialogOpen(true);
    }

    // To close dialog after editing card
    const handleEditClickClose = (toEdit: CardType | null) => {
        if (toEdit) {
            editCardApi(toEdit)
                .then(result => {
                    setCards(cards.map(card => card.id === result.id ? result : card));
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
                  
                      
                    enqueueSnackbar('Flashcard edited!', { 
                        variant: 'info',
                        autoHideDuration: 1500,
                        action
                    });
                });
        }
        setEditObject(null);
        setDialogOpen(false);
    }

    const handleDeleteDialogOpen = (card : CardType) => {
        setDeleteDialogOpen(true);
        setDeleteObject(card);
    }

    return (    
        <>
            <div className={styles.topBar}>
                <ArrowBackIosNewIcon 
                    className={styles.cardSettingsIcon}
                    sx={{color: "text.secondary"}} 
                    onClick={() => navigate(-1)}
                />
                <Typography
                    color="text.secondary"
                    variant="h5"
                    sx={{
                        paddingLeft: '1rem',
                        paddingBottom: '1rem',
                    }}
                >
                    {deckName}
                </Typography> 

                {pageNumber !== 1 && <NavigateBeforeIcon 
                    className={styles.cardSettingsIcon}
                    sx={{
                        marginLeft: '10rem',
                        color: "text.secondary",
                        width: '2rem',
                        height: '2rem',
                    }} 
                    onClick={() => {
                        setPageNumber(pageNumber - 1);
                    }}
                />}

                <Typography
                    color="text.secondary"
                    variant="h5"
                    sx={{
                        paddingBottom: '1rem',
                    }}
                >
                    Page {pageNumber} of {totalPages}
                </Typography> 
                
                {pageNumber !== totalPages && <NavigateNextIcon 
                    className={styles.cardSettingsIcon}
                    sx={{
                        color: "text.secondary",
                        width: '2rem',
                        height: '2rem',
                    }} 
                    onClick={() => {
                        setPageNumber(pageNumber + 1);
                    }}
                />}
            </div>
            <div className={styles.deckManager}>
                <div className={styles.gridContainer}>
                    { cards.map((card) => (
                        <div className={styles.gridItem} key={card.id}>
                            {createCard(card)}
                            <div className={styles.cardSettings}>
                                <ModeEditIcon 
                                    className={styles.cardSettingsIcon}
                                    sx={{color: "text.secondary"}} 
                                    onClick={() => editCard(card)}
                                />
                                <DeleteIcon 
                                    className={styles.cardSettingsIcon} 
                                    sx={{color: "text.secondary"}} 
                                    onClick={() => handleDeleteDialogOpen(card)}        
                                />           
                                    <Dialog 
                                        TransitionComponent={Transition}
                                        keepMounted
                                        open={deleteDialogOpen} 
                                        onClose={() => setDeleteDialogOpen(false)}  // Prevent closing on clicking outside dialog
                                        PaperProps={{
                                            style: {
                                            // Cant use primary theme here for some reason
                                            backgroundColor: window.localStorage.getItem('mode') === 'light' ? "#94e2e4" : '#3e5641', // theme primary.light
                                            borderRadius: '10px',
                                            },
                                        }}
                                    >
                                        <DialogTitle
                                            sx={{ 
                                            fontFamily: 'Staatliches',
                                            color: 'text.secondary',
                                            }}
                                        >
                                            u sure u wan delete ah
                                        </DialogTitle>
                                        <DialogActions>
                                            <Button 
                                                color="secondary"
                                                variant="contained"
                                                onClick={() => setDeleteDialogOpen(false)}
                                            >
                                                Cancel
                                            </Button>

                                            <Button 
                                                color="primary"
                                                variant="contained"
                                                onClick={removeCard}
                                            >
                                                Delete from Deck
                                            </Button>
                                            <Button 
                                                color="primary"
                                                variant="contained"
                                                onClick={deleteCard}
                                            >
                                                Wipe Card from Existence
                                            </Button>
                                        </DialogActions>
                                    </Dialog>                     
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
                        <AddCardDialog 
                            dialogOpen={dialogOpen} 
                            handleClose={handleClickClose} 
                            editObject={editObject}
                            setEditObject={setEditObject}
                            editHandleClose={handleEditClickClose}
                        />
                    </div>
                </div>
                <div className={styles.sidebar}>
                    <Button 
                        variant="contained"
                        color="primary"
                        size="large"
                    />
                </div>
            </div>
        </>
    );
}

export default DeckManager;
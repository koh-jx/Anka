import { ReactElement, useState, useEffect, Fragment } from 'react'
import { useLocation } from 'react-router-dom';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';
import { useSnackbar } from 'notistack';

import { createCard } from '../Card/CardFactory';
import AddCardDialog from './AddCardDialog';
import DeleteCardDialog from './DeleteCardDialog';
import { CardType, DeckType } from '../../common/types';

import { 
    editCardApi,
    removeCardApi, 
} from '../../lib/api/cardFunctions';
import { 
    createCardToDeckApi,
    removeCardFromDeckApi,
    getCardsFromDeckIdApi,
    getDeckApi,
} from '../../lib/api/deckFunctions';

import styles from './DeckManager.module.css';
import TopBar from '../TopBar';
import { NUM_CARDS_PER_PAGE } from '../../common/constants';
  
function DeckManager(): ReactElement {
    // React Router
    const location = useLocation();
    const deckName = (location.state as DeckType).name;
    const deckId = (location.state as DeckType).id;
    // UseStates
    const [dialogOpen, setDialogOpen] = useState(false);
    const [cards, setCards] = useState<CardType[]>([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [numCards, setNumCards] = useState(1);
    const [editObject, setEditObject] = useState<CardType | null>(null);           // The original card before edit (for dialog)     
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleteObject, setDeleteObject] = useState<CardType | null>(null);       // The original card before delete (for dialog)
    // Snackbar
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    // Initialise the number of cards (and total pages) and card data for the first page
    useEffect(() => {
        getDeckApi(deckId).then(deck => {
            setNumCards(deck.cards.length)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // API call whenever page number is changed
    useEffect(() => {
        getCardsFromDeckIdApi(deckId, pageNumber)
            .then(cards => {
                setCards(cards)
            });
    }, [pageNumber, deckId]);

    // Update the total number of pages when the total number of cards change
    // If just nice number of cards is divisible by num_cards_per_page, then add extra page for add card button
    useEffect(() => {
        setTotalPages(numCards % NUM_CARDS_PER_PAGE === 0 
            ? Math.ceil(numCards / NUM_CARDS_PER_PAGE) + 1 
            : Math.ceil(numCards / NUM_CARDS_PER_PAGE)
        );
    }, [numCards]);
    
    // To open the dialog when adding card
    const handleClickOpen = () => {
        setDialogOpen(true);
    }

    // To close dialog after adding card
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
                    
                    // Set number of cards, updating totalPages in the useEffect
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


    // Delete card
    const handleDeleteClickClose = (isHardDelete: boolean) => {
        if (deleteObject && isHardDelete) {
            removeCardApi(deleteObject).then(deleteCard);
        } else if (deleteObject && !isHardDelete) {
            removeCardFromDeckApi(deleteObject, deckId).then(deleteCard);
        }
        setDeleteDialogOpen(false);
    }

    // Called by delete functions to handle data after different types of deletion as seen above
    const deleteCard = () => {
        setCards(cards.filter(card => {
            return card.id !== (deleteObject as CardType).id
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

        // Set number of cards, updating totalPages in the useEffect
        setNumCards(numCards - 1);

        getCardsFromDeckIdApi(deckId, pageNumber)
            .then(cards => {
                setCards(cards)
            });
        
        enqueueSnackbar('Flashcard deleted!', { 
            variant: 'error',
            autoHideDuration: 1500,
            action
        });
    }

    // To open the dialog to edit a card
    const handleEditCardClickOpen = (cardToEdit : CardType) => {
        setEditObject(cardToEdit);
        setDialogOpen(true);
    }

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
            <TopBar
                title={deckName}
                showBackArrow={true}
                pageNumber={pageNumber}
                setPageNumber={setPageNumber}
                totalPages={totalPages}
            />
            <div className={styles.deckManager}>
                <div className={styles.gridContainer}>
                    {/* Card displays  */}
                    { cards.map((card) => (
                        <div className={styles.gridItem} key={card.id}>
                            {createCard(card)}
                            <div className={styles.cardSettings}>
                                <ModeEditIcon 
                                    className={styles.cardSettingsIcon}
                                    sx={{color: "text.secondary"}} 
                                    onClick={() => handleEditCardClickOpen(card)}
                                />
                                <DeleteIcon 
                                    className={styles.cardSettingsIcon} 
                                    sx={{color: "text.secondary"}} 
                                    onClick={() => handleDeleteDialogOpen(card)}        
                                />                           
                            </div>
                        </div>
                    )) }
                    {/* Add Card button  */}
                    { cards.length < NUM_CARDS_PER_PAGE && <div className={styles.gridItem}>
                        <div 
                            className={styles.card}
                            onClick={handleClickOpen}
                        >
                            <AddCircleIcon sx={{ 
                                fontSize: '6rem',
                                color: 'rgb(0,0,0,0.3)'
                            }}/>
                        </div>  
                    </div> }
                    {/* Add Card Dialog */}
                    <AddCardDialog 
                            dialogOpen={dialogOpen} 
                            handleClose={handleClickClose} 
                            editObject={editObject}
                            setEditObject={setEditObject}
                            editHandleClose={handleEditClickClose}
                    />  
                    {/* Delete Dialog */}
                    <DeleteCardDialog
                        deleteDialogOpen={deleteDialogOpen}
                        setDeleteDialogOpen={setDeleteDialogOpen}
                        handleDeleteClickClose={handleDeleteClickClose}
                    />
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
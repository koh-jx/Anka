import { ReactElement, useState, useEffect, Fragment } from 'react'
import { useLocation } from 'react-router-dom';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import FmdBadIcon from '@mui/icons-material/FmdBad';
import { useSnackbar } from 'notistack';

import { createCard } from '../Card/CardFactory';
import AddCardDialog from './AddCardDialog';
import DeleteDialog from '../DeleteDialog';
import TopBar from '../TopBar';
import SideBar from './SideBar';

import { 
    isDueForReview,
    getTimeToReview,
    editCardApi,
    removeCardApi, 
} from '../../lib/api/cardFunctions';
import { 
    createCardToDeckApi,
    removeCardFromDeckApi,
    getCardsFromDeckIdApi,
    getCardsToReviewFromDeckApi,
    getDeckApi,
} from '../../lib/api/deckFunctions';
import { CardType, DeckType } from '../../common/types';
import { NUM_CARDS_PER_PAGE } from '../../common/constants';
import { getSnackbarActions } from '../../common/transitions';

import styles from './DeckManager.module.css';
  
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
    const [numCards, setNumCards] = useState(0);
    const [editObject, setEditObject] = useState<CardType | null>(null);           // The original card before edit (for dialog)     
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleteObject, setDeleteObject] = useState<CardType | null>(null);       // The original card before delete (for dialog)
    const [dueForReviewCount, setDueForReviewCount] = useState(0);
    // Snackbar
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    // Initialise the number of cards (and total pages) and card data for the first page
    useEffect(() => {
        getDeckApi(deckId).then(deck => {
            setNumCards(deck.cards.length);
        })
        getCardsToReviewFromDeckApi(deckId).then(cards => {
            setDueForReviewCount(cards.length);
        });
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
        setDialogOpen(false);
        if (!toAdd) return;
        createCardToDeckApi(toAdd, deckId)
            .then(result => {
                setCards([...cards, result]);
                setDueForReviewCount(dueForReviewCount+1);
                const action = getSnackbarActions(closeSnackbar);
                
                // Set number of cards, updating totalPages in the useEffect
                setNumCards(numCards + 1);

                enqueueSnackbar('Flashcard created!', { 
                    variant: 'success',
                    autoHideDuration: 1500,
                    action
                });
            });
    }


    // Delete card
    const handleDeleteClickClose = (isHardDelete: boolean) => {
        setDeleteDialogOpen(false);
        if (!deleteObject) return;
        const dueForReview = isDueForReview(deleteObject);
        if (isHardDelete) removeCardApi(deleteObject).then(() => deleteCard(dueForReview));
        else removeCardFromDeckApi(deleteObject, deckId).then(() => deleteCard(dueForReview));
    }

    // Called by delete functions to handle data after different types of deletion as seen above
    const deleteCard = (dueForReview: boolean) => {
        setCards(cards.filter(card => {
            return card.id !== (deleteObject as CardType).id
        }));
        const action = getSnackbarActions(closeSnackbar);

        // Set number of cards, updating totalPages in the useEffect
        setNumCards(numCards - 1);
        if (dueForReview) setDueForReviewCount(dueForReviewCount-1);

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
        setEditObject(null);
        setDialogOpen(false);
        if (!toEdit) return;
        editCardApi(toEdit)
            .then(result => {
                setCards(cards.map(card => card.id === result.id ? result : card));
                const action = getSnackbarActions(closeSnackbar);
                enqueueSnackbar('Flashcard edited!', { 
                    variant: 'info',
                    autoHideDuration: 1500,
                    action
                });
            });        
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
                            <div className={styles.card}>
                                { isDueForReview(card) && 
                                    <div className={styles.dueForReview}>
                                        <FmdBadIcon />
                                        Review required
                                    </div> 
                                }
                                { !isDueForReview(card) && 
                                    <div className={styles.reviewText}>
                                        Review in { getTimeToReview(card) } { getTimeToReview(card) === 1 ? 'day' : 'days' }
                                    </div> 
                                }
                                {createCard(card)}
                            </div>
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
                            className={styles.addCard}
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
                    <DeleteDialog
                        deleteDialogOpen={deleteDialogOpen}
                        setDeleteDialogOpen={setDeleteDialogOpen}
                        handleDeleteClickClose={handleDeleteClickClose}
                        title={"Are you sure?"}
                        defaultDeleteCaption={"Delete from deck"}
                        hardDeleteCaption={"Wipe card from existence"}
                    />
                </div>
                <div className={styles.sidebar}>
                    <SideBar deckId={deckId} numCards={numCards} dueForReviewCount={dueForReviewCount}/>
                </div>
            </div>
        </>
    );
}

export default DeckManager;
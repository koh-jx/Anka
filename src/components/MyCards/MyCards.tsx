import { ReactElement, useState, useEffect, Fragment } from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSnackbar } from 'notistack';

import { createCard } from '../Card/CardFactory';
import AddCardDialog from '../DeckManager/AddCardDialog';
import DeleteDialog from '../DeleteDialog';
import { CardType } from '../../common/types';

import { 
    getUserApi,
    getUserCardsApi,
    createCardApi,
    editCardApi,
    removeCardApi, 
} from '../../lib/api/cardFunctions';

import styles from './MyCards.module.css';
import TopBar from '../TopBar';
import { NUM_CARDS_PER_PAGE } from '../../common/constants';
import { getSnackbarActions } from '../../common/transitions';
  
export default function MyCards(): ReactElement {
    // UseStates
    const [dialogOpen, setDialogOpen] = useState(false);
    const [cards, setCards] = useState<CardType[]>([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [numCards, setNumCards] = useState(1);
    const [editObject, setEditObject] = useState<CardType | null>(null);           // The original card before edit (for dialog)     
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [cardToDelete, setCardToDelete] = useState<CardType | null>(null);
    // Snackbar
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    // Initialise the number of cards (and total pages) and card data for the first page
    useEffect(() => {
        getUserApi().then(user => {
            setNumCards(user.cards.length)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // API call whenever page number is changed
    useEffect(() => {
        getUserCardsApi(pageNumber)
            .then(cards => {
                setCards(cards)
            });
    }, [pageNumber]);

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

        createCardApi(toAdd)
            .then(result => {
                setCards([...cards, result]);
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

    const handleDeleteDialogOpen = (card: CardType) => {
        setCardToDelete(card);
        setDeleteDialogOpen(true);
    }

    // Delete card
    const handleDelete = (cardToDelete : CardType | null) => {
        setDeleteDialogOpen(false);
        if (!cardToDelete) return;

        removeCardApi(cardToDelete).then(() => {
            setCards(cards.filter(card => {
                return cardToDelete.id !== card.id
            }));
            const action = getSnackbarActions(closeSnackbar);
    
            // Set number of cards, updating totalPages in the useEffect
            setNumCards(numCards - 1);
            getUserCardsApi(pageNumber)
                .then(cards => {
                    setCards(cards)
                });
            
            enqueueSnackbar('Flashcard deleted!', { 
                variant: 'error',
                autoHideDuration: 1500,
                action
            });
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

    return (    
        <>
            <TopBar
                title="Your Cards"
                showBackArrow={false}
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
                        handleDeleteClickClose={() => handleDelete(cardToDelete)}
                        title={"Are you sure?"}
                        defaultDeleteCaption="Delete Card"
                    />
                </div>
            </div>
        </>
    );
}
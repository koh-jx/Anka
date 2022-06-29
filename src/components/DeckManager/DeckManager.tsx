import { ReactElement, useState, useEffect, Fragment } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import DeleteIcon from '@mui/icons-material/Delete';
import { Typography } from '@mui/material';
import { useSnackbar } from 'notistack';

import { createCard, CardType } from '../Card/CardFactory';
import { DeckType } from '../MyDecks/MyDecks';
import AddCardDialog from './AddCardDialog';


import styles from './DeckManager.module.css';
import { 
    getUser, 
    createAndAddCardToDeck, 
    getDeck, 
    editCardInDB, 
    removeCardFromDeck 
} from '../../lib/api/cardFunctions';
import { Button } from '@mui/material';
  
function DeckManager(): ReactElement {
    // Get deck information
    const location = useLocation();
    const deckName = (location.state as DeckType).name;
    // const deckCards = (location.state as DeckType).cards;
    // const deckId = (location.state as DeckType).id;
    const navigate = useNavigate();

    const [dialogOpen, setDialogOpen] = useState(false);
    const [cards, setCards] = useState<CardType[]>([]);

    // To edit a card
    const [editObject, setEditObject] = useState<CardType | null>(null);           // The original card before edit (for dialog)        
    
    // Snackbar
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    useEffect(() => {
        // TODO API: To get from deck id instead
        getUser()
            .then(user => getDeck(user.cards)
                .then(cards => {
                    setCards(cards)
                }));
    }, []);
    
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
            createAndAddCardToDeck(toAdd)
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
    const removeCard = (cardToRemove : CardType) => {
        removeCardFromDeck(cardToRemove).then(() => {
            setCards(cards.filter(card => {
                return card.id !== cardToRemove.id
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

    // To open the dialog to edit a card
    const editCard = (cardToEdit : CardType) => {
        setEditObject(cardToEdit);
        setDialogOpen(true);
    }

    // To close dialog after editing card
    const handleEditClickClose = (toEdit: CardType | null) => {
        if (toEdit) {
            editCardInDB(toEdit)
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
                                    onClick={() => removeCard(card)}        
                                />
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
                        onClick={ async () => {
                            console.log(await(getDeck((await getUser()).cards)));
                        }}
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
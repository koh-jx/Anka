import { ReactElement, useState, useEffect } from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';

import { createCard, CardType } from '../Card/CardFactory';
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
    
    const [dialogOpen, setDialogOpen] = useState(false);
    const [cards, setCards] = useState<CardType[]>([]);
    // To edit a card
    const [editObject, setEditObject] = useState<CardType | null>(null);           // The original card before edit (for dialog)     
    const [editUndoObject, setEditUndoObject] = useState<CardType | null>(null);   // The original card before edit (for undo),     

    useEffect(() => {
        getUser()
            .then(user => getDeck(user.cards)
                .then(cards => {
                    setCards(cards)
                }));
    }, []);
    
    const handleClickOpen = () => {
        setDialogOpen(true);
    }

    const handleClickClose = (toAdd: CardType | null) => {
        if (toAdd) {
            createAndAddCardToDeck(toAdd)
                .then(result => {
                    setCards([...cards, result]);
                });            
        }
        setDialogOpen(false);
    }

    const editCard = (cardToEdit : CardType) => {
        setEditObject(cardToEdit);
        setEditUndoObject(cardToEdit);
        setDialogOpen(true);
    }

    const handleEditClickClose = (toEdit: CardType | null) => {
        if (toEdit) {
            editCardInDB(toEdit)
                .then(result => {
                    setCards(cards.map(card => card.id === result.id ? result : card));
                });
        }
        setEditObject(null);
        setDialogOpen(false);
    }

    const undoEditCard = (cardToUndo: CardType) => {
        if (editUndoObject) {
            editCardInDB(cardToUndo)
                .then(result => {
                    setCards(cards.map(card => card.id === result.id ? result : card));
                });
        }
    }

    const removeCard = (cardToRemove : CardType) => {
        console.log(cardToRemove)
        removeCardFromDeck(cardToRemove).then((data) => {
            console.log(data)
            setCards(cards.filter(card => card !== cardToRemove));
        });
    }

    return (    
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
                        undo={removeCard}
                        editObject={editObject}
                        setEditObject={setEditObject}
                        editHandleClose={handleEditClickClose}
                        editUndo={undoEditCard}
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
    );
}

export default DeckManager;
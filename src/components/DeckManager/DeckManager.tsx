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
    const [editIndex, setEditIndex] = useState<number | null>(null);                    // The index of the card to be edited

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
            setCards([...cards, toAdd]);
            createAndAddCardToDeck(toAdd);
        }
        setDialogOpen(false);
    }

    const editCard = (cardToEdit : CardType) => {
        setEditObject(cardToEdit);
        setEditUndoObject(cardToEdit);
        setEditIndex(cards.indexOf(cardToEdit));
        setDialogOpen(true);
    }

    const handleEditClickClose = (toEdit: CardType | null) => {
        if (toEdit && editIndex !== null) {
            const newCards = [...cards];
            newCards[editIndex] = toEdit;
            setCards(newCards);
            editCardInDB(toEdit);
        }
        setEditObject(null);
        setDialogOpen(false);
    }

    const undoEditCard = (cardToUndo: CardType) => {
        if (editIndex && editUndoObject) {
            const newCards = [...cards];
            newCards[editIndex] = editUndoObject;
            setCards(newCards);
        }
    }

    const removeCard = (cardToRemove : CardType) => {
        setCards(cards.filter(card => card !== cardToRemove));
        removeCardFromDeck(cardToRemove);
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
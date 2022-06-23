import { ReactElement, useState } from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';

import { createCard, CardInterface } from '../Card/CardFactory';
import AddCardDialog from './AddCardDialog';


import styles from './DeckManager.module.css';
  
function DeckManager(): ReactElement {
    
    const [dialogOpen, setDialogOpen] = useState(false);
    const [cards, setCards] = useState<CardInterface[]>([]);
    // To edit a card
    const [editObject, setEditObject] = useState<CardInterface | null>(null);           // The original card before edit (for dialog)     
    const [editUndoObject, setEditUndoObject] = useState<CardInterface | null>(null);   // The original card before edit (for undo),     
    const [editIndex, setEditIndex] = useState<number | null>(null);                    // The index of the card to be edited
    
    const handleClickOpen = () => {
        setDialogOpen(true);
    }

    const handleClickClose = (toAdd: CardInterface | null) => {
        if (toAdd) {
            setCards([...cards, toAdd]);
        }
        setDialogOpen(false);
    }

    const editCard = (cardToEdit : CardInterface) => {
        setEditObject(cardToEdit);
        setEditUndoObject(cardToEdit);
        setEditIndex(cards.indexOf(cardToEdit));
        setDialogOpen(true);
    }

    const handleEditClickClose = (toEdit: CardInterface | null) => {
        if (toEdit && editIndex) {
            const newCards = [...cards];
            newCards[editIndex] = toEdit;
            setCards(newCards);
        }
        setEditObject(null);
        setDialogOpen(false);
    }

    const undoEditCard = (cardToUndo: CardInterface) => {
        if (editIndex && editUndoObject) {
            const newCards = [...cards];
            newCards[editIndex] = editUndoObject;
            setCards(newCards);
        }
    }

    const removeCard = (cardToRemove : CardInterface) => {
        setCards(cards.filter(card => card !== cardToRemove));
    }

    return (    
        <div className={styles.deckManager}>
            <div className={styles.gridContainer}>
                { cards.map((card, index) => (
                    <div className={styles.gridItem} key={index}>
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
                        editIndex={editIndex}
                        editHandleClose={handleEditClickClose}
                        editUndo={undoEditCard}
                    />
                </div>
            </div>
            <div className={styles.sidebar}>
                Sidebar that does nothing for now
            </div>
        </div>
    );
}

export default DeckManager;
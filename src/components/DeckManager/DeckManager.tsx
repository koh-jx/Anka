import { ReactElement, useState } from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';

import Card from '../Card';
import { CardInterface } from '../Card/Card';
import AddCardDialog from './AddCardDialog';

import styles from './DeckManager.module.css';
  
function DeckManager(): ReactElement {
    
    const [dialogOpen, setDialogOpen] = useState(false);
    const [cards, setCards] = useState<CardInterface[]>([]);
    
    const handleClickOpen = () => {
        setDialogOpen(true);
    }

    const handleClickClose = (toAdd: CardInterface | null) => {
        if (toAdd) {
            setCards([...cards, toAdd]);
        }
        setDialogOpen(false);
    }

    const removeCard = (cardToRemove : CardInterface) => {
        setCards(cards.filter(card => card !== cardToRemove));
    }

    return (    
        <div className={styles.deckManager}>
            <div className={styles.gridContainer}>
                { cards.map(card => (
                    <div className={styles.gridItem}>
                        <Card
                            frontCardface={card.front}
                            backCardface={card.back}
                            tags={card.tags}
                        />
                        <div className={styles.cardSettings}>
                            <ModeEditIcon 
                                className={styles.cardSettingsIcon}
                                sx={{color: "text.secondary"}} 
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
                    <AddCardDialog dialogOpen={dialogOpen} handleClose={handleClickClose} undo={removeCard}/>
                </div>
            </div>
            <div className={styles.sidebar}>
                Sidebar that does nothing for now
            </div>
        </div>
    );
}

export default DeckManager;
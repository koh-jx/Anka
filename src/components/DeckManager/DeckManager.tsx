import { ReactElement, useState } from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle';

import Card from '../Card';
import { CardInterface } from '../Card/Card';
import AddCardDialog from '../AddCardDialog';

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
                    <AddCardDialog dialogOpen={dialogOpen} handleClose={handleClickClose}/>
                </div>
            </div>
            <div className={styles.sidebar}>
                Sidebar that does nothing for now
            </div>
        </div>
    );
}

export default DeckManager;
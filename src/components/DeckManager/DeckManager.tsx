import { ReactElement, useState } from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle';

import Card from '../Card';

import styles from './DeckManager.module.css';

interface CardInterface {
    front: ReactElement;
    back: ReactElement;
    tags: string[];
}
  
function DeckManager(): ReactElement {
    
    const [cards, setCards] = useState<CardInterface[]>([]);

    const addCard = () => {
        setCards([...cards, {
            front: <div>Front</div>,
            back: <div>Back</div>,
            tags: []
        }]);
    }

    return (    
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
                    onClick={addCard}
                >
                    <AddCircleIcon sx={{ 
                        fontSize: '6rem',
                        color: 'rgb(0,0,0,0.3)'
                        
                    }}/>
                </div>
            </div>
        </div>
    );
}

export default DeckManager;
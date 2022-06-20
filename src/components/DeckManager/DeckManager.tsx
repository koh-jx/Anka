import { ReactElement, useState } from 'react'
import { Button } from '@mui/material';

import Card from '../Card';

import styles from './DeckManager.module.css';

interface CardInterface {
    front: ReactElement;
    back: ReactElement;
    tags: string[];
}
  
function DeckManager(): ReactElement {
    
    const [cards, setCards] = useState<CardInterface[]>([]);

    return (    
        <>
            <div className={styles.toolBar}>
                <Button 
                    color="secondary"
                    variant="contained"
                    style={{ 
                        whiteSpace: 'nowrap'
                    }}
                >
                        Create new
                </Button>
            </div>
            <div className={styles.gridContainer}>
                <div className={styles.gridItem}>
                    { cards.map(card => (
                        <Card
                            frontCardface={card.front}
                            backCardface={card.back}
                            tags={card.tags}
                        />
                    )) }
                </div>
            </div>
        </>
    );
}

export default DeckManager;
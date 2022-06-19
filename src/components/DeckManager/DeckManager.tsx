import { ReactElement, useState } from 'react'
import Card from '../Card';

import styles from './DeckManager.module.css';
  
function DeckManager(): ReactElement {
    // const [cards, setCards] = useState([]);
    return (    
        <div className={styles.gridContainer}>
            <div className={styles.gridItem}>
                <Card />
            </div>
            <div className={styles.gridItem}>
                <Card />
            </div>
            <div className={styles.gridItem}>
                <Card />
            </div>
            <div className={styles.gridItem}>
                <Card />
            </div>
            <div className={styles.gridItem}>
                <Card />
            </div>
            <div className={styles.gridItem}>
                <Card />
            </div>
            <div className={styles.gridItem}>
                <Card />
            </div>
            <div className={styles.gridItem}>
                <Card />
            </div>
            <div className={styles.gridItem}>
                <Card />
            </div>
            <div className={styles.gridItem}>
                <Card />
            </div>
            <div className={styles.gridItem}>
                <Card />
            </div>
            <div className={styles.gridItem}>
                <Card />
            </div>
        </div>
    );
}

export default DeckManager;
import { ReactElement, useState, useEffect } from 'react';
import styles from './LoadingScreen.module.css';
import loadingScreen from '../../assets/loadingScreen.gif';

function LoadingScreen(): ReactElement {

    const WALKING_INTERVAL = 2;
    const [isOpposite, setIsOpposite] = useState(false);
    const [position, setPosition] = useState(20);

    useEffect(() => {
        const intervalId = setInterval(() => { 
            if (position === 70) {
                setIsOpposite(true);
                setPosition(position - WALKING_INTERVAL);
            } else if (position === 20) {
                setIsOpposite(false);
                setPosition(position + WALKING_INTERVAL);
            } else if (isOpposite) {
                setPosition(position - WALKING_INTERVAL);
            } else {
                setPosition(position + WALKING_INTERVAL);
            }
            
        }, 500)
        return () => clearInterval(intervalId);
    }, [isOpposite, position])

    return ( 
        <div className={styles.container}>
            <div className={styles.text}>
                Loading!
            </div>
            <img 
                src={loadingScreen} 
                className={styles.duck} 
                alt="Duck" 
                style={{
                    left: `${position}%`,
                    transform: `${isOpposite ? 'scaleX(-1)' : ''}`
                }}
            />
        </div>
    );
}

export default LoadingScreen;
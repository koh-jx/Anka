import { ReactElement, useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom';
import { SwitchTransition, CSSTransition } from "react-transition-group";
import { Button, Typography } from '@mui/material';
import BackArrow from '../BackArrow';
import LoadingScreen from '../LoadingScreen';
import { createCard } from '../Card/CardFactory';
import { CardType } from '../../common/types';
import { getCardApi } from '../../lib/api/cardFunctions';

import styles from './TestingPage.module.css';
import "./styles.css";

type LocationInfo = {
    cardIds: string[];
}

function TestingPage(): ReactElement {
    // React Router
    const location = useLocation();
    const cardIds = (location.state as LocationInfo).cardIds;
    
    const [cards, setCards] = useState<CardType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const nodeRef = useRef<any>(null);

    // Load deck upon mounting
    useEffect(() => {
        setIsLoading(true);
        setCurrentIndex(0);
        Promise.all(cardIds.map(cardId => getCardApi(cardId)))
            .then(cards => {
                shuffle(cards)
                setCards(cards);
                setTimeout(() => {
                    setIsLoading(false);
                }, 500);
            });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const shuffle = (array: CardType[]) : CardType[] => {
        let currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle.
        while (currentIndex !== 0) {
      
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
    }

    const handleClick = () => {
        if (currentIndex < cards.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    }

    return ( 
        <>  
            <div className={styles.testTopBar}>
                <BackArrow showBackArrow={true} />
                {!isLoading && 
                    <Typography
                        color="text.secondary"
                        className={styles.testTitle}
                        variant="h5"
                        sx={{
                            width: '20%',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        {currentIndex + 1} of {cards.length} cards
                    </Typography> 
                }
            </div>
            
            {isLoading && <LoadingScreen />}
            {!isLoading && (
                <div className={styles.testContainer}>
                    <SwitchTransition mode="out-in">
                        <CSSTransition
                            nodeRef={nodeRef}
                            addEndListener={(done: () => void) => {
                            nodeRef.current?.addEventListener("transitionend", done, false);
                            }}
                            classNames="fade"
                            key={currentIndex}
                        >
                            <div className={styles.testCard} ref={nodeRef}>
                                {createCard(cards[currentIndex])}
                            </div>
                        </CSSTransition>
                    </SwitchTransition>
                    
                    <Button 
                        variant="contained"
                        color="primary"
                        sx={{
                            width: "10%",
                            height: "10%",
                            fontSize: "1rem",
                            borderRadius: "30px",
                        }}
                        onClick={handleClick}
                    >
                        {(currentIndex < cards.length - 1) ? "Next" : "Finish Test"}
                    </Button>
                </div>
                
            )}
        </>
    );
}

export default TestingPage;
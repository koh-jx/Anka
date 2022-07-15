import { ReactElement, useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom';
import { SwitchTransition, CSSTransition } from "react-transition-group";
import { Button, Typography } from '@mui/material';
import BackArrow from '../BackArrow';
import LoadingScreen from '../LoadingScreen';
import { createTestAnswerCard } from '../Card/CardFactory';
import { CardType } from '../../common/types';
import { getCardApi } from '../../lib/api/cardFunctions';

import styles from './TestingPage.module.css';
import "./styles.css";
import Textfield from '../Textfield';

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
    const [answer, setAnswer] = useState("");
    const [hasAnswered, setHasAnswered] = useState(false);
    const nodeRef = useRef<any>(null);

    // Load deck upon mounting
    useEffect(() => {
        setIsLoading(true);
        setCurrentIndex(0);
        setHasAnswered(false);
        setAnswer("");
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

    const handleSubmitAnswer = () => {
        setHasAnswered(true);
    }

    const keyPressSubmit = (e: any) => {
        if(e.keyCode === 13) handleSubmitAnswer();
    }

    const handleNext = () => {
        if (currentIndex < cards.length - 1) {
            setHasAnswered(false);
            setAnswer("");
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
                                {createTestAnswerCard(cards[currentIndex], hasAnswered, answer)}
                            </div>
                        </CSSTransition>
                    </SwitchTransition>
                    
                    {!hasAnswered &&
                        <div className={styles.bar}>
                            <Textfield value={answer} setValue={setAnswer} label="Your answer" onKeyDown={keyPressSubmit}/>
                            <Button 
                                variant="contained"
                                color="primary"
                                sx={{
                                    width: '40%',
                                    fontSize: "1rem",
                                    borderRadius: "30px",
                                }}
                                onClick={handleSubmitAnswer}
                            >
                                Submit
                            </Button>
                        </div>
                        
                    }
                    {hasAnswered &&
                        <>
                            <Typography
                                color="text.secondary"
                                variant="h5"
                                sx={{
                                    paddingBottom: "1rem",
                                }}
                            >
                                Your answer was {answer}.
                            </Typography>
                            <div className={styles.bar}>
                                <Button 
                                    variant="contained"
                                    color="primary"
                                    sx={{
                                        width: "40%",
                                        fontSize: "1rem",
                                        borderRadius: "30px",
                                    }}
                                    onClick={handleNext}
                                >
                                    {(currentIndex < cards.length - 1) ? "Next" : "Finish Test"}
                                </Button>
                            </div>
                        </>
                    }
                </div>
                
            )}
        </>
    );
}

export default TestingPage;
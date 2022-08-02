import { ReactElement, useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

import { SwitchTransition, CSSTransition } from "react-transition-group";
import { Button, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';

import BackArrow from '../BackArrow';
import LoadingScreen from '../LoadingScreen';
import Textfield from '../Textfield';
import SelfEvaluationBar from './SelfEvaluationBar';
import { createTestAnswerCard } from '../Card/CardFactory';


import { getCardApi, reviewCardApi } from '../../lib/api/cardFunctions';
import { getDeckApi, getCardsToReviewFromDeckApi } from '../../lib/api/deckFunctions';
import { CardType } from '../../common/types';
import { getSnackbarActions } from '../../common/transitions';
import { MIN_LOADING_TIME } from '../../common/constants';

import styles from './TestingPage.module.css';
import "./styles.css";


type LocationInfo = {
    deckId: string;
    deckName: string;
    isDailyReview: boolean;
}

function TestingPage(): ReactElement {
    // React Router
    const location = useLocation();
    const navigate = useNavigate();
    const deckId = (location.state as LocationInfo).deckId;
    const isDailyReview = (location.state as LocationInfo).isDailyReview;

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    
    const [cards, setCards] = useState<CardType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answer, setAnswer] = useState("");
    const [hasAnswered, setHasAnswered] = useState(false);
    const [isFlipped, setIsFlipped] = useState(false);
    const [selfEvaluation, setSelfEvaluation] = useState(-1);
    const [hasEvaluated, setHasEvaluated] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const nodeRef = useRef<any>(null);
    const firstErrorClickRef = useRef<boolean>(true);

    // Load deck upon mounting
    useEffect(() => {
        setIsLoading(true);
        setCurrentIndex(0);
        setHasAnswered(false);
        setAnswer("");
        if (isDailyReview) {
            getCardsToReviewFromDeckApi(deckId)
            .then(cards => {
                shuffle(cards)
                setCards(cards);
                setTimeout(() => {
                    setIsLoading(false);
                }, MIN_LOADING_TIME);
            });
        } else {
            getDeckApi(deckId).then(deck => {
                Promise.all(deck.cards.map(cardId => getCardApi(cardId)))
                .then(cards => {
                    shuffle(cards)
                    setCards(cards);
                    setTimeout(() => {
                        setIsLoading(false);
                    }, MIN_LOADING_TIME);
                });
            })
            
        }
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
        setIsFlipped(true);
        setIsCorrect(cards[currentIndex].backCardFaceProps.backTitle === answer);
    }

    const keyPressSubmit = (e: any) => {
        if(e.keyCode === 13) handleSubmitAnswer();
    }

    const handleNext = () => {
        if (isDailyReview) reviewCardApi(cards[currentIndex].id, selfEvaluation);
        if (currentIndex < cards.length - 1) {
            setHasAnswered(false);
            setIsFlipped(false);    
            setAnswer("");
            setCurrentIndex(currentIndex + 1);
            setSelfEvaluation(-1);
            setHasEvaluated(false);
        }
    }

    const finishTest = () => {
        if (isDailyReview) reviewCardApi(cards[currentIndex].id, selfEvaluation);
        navigate(-1);
    }

    const handleClickCard = () => {
        if (hasAnswered) {
            setIsFlipped(!isFlipped);
        } else if (firstErrorClickRef.current) {
            const action = getSnackbarActions(closeSnackbar);
            firstErrorClickRef.current = false;
            enqueueSnackbar('Submit your answer first!', { 
                variant: 'error',
                autoHideDuration: 1500,
                action
            });
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
                        {currentIndex + 1} of {cards.length} {cards.length === 1 ? "card" : "cards"}
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
                            <div 
                                className={
                                    hasAnswered
                                        ? styles.testCard
                                        : [styles.testCard, styles.testCardNotAnswered].join(' ')
                                } 
                                ref={nodeRef}
                                onClick={handleClickCard}
                            >
                                {createTestAnswerCard(cards[currentIndex], isFlipped, answer)}
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
                            <div className={styles.bar}>
                                <Typography
                                    color="text.secondary"
                                    variant="h5"
                                    sx={{
                                        marginBottom: "1rem",
                                    }}
                                >
                                    Your answer was {answer}.
                                </Typography>
                                {!isCorrect && isDailyReview && <Button
                                    variant="text"
                                    sx={{
                                        color: "rgb(0,0,0,0.3)",
                                        marginLeft: "1rem",
                                        marginBottom: "1rem",
                                    }}
                                    onClick={() => setIsCorrect(true)}
                                >
                                    <Typography
                                        variant="subtitle2"
                                    >
                                    My answer was correct
                                </Typography>
                                </Button> }
                            </div>
                            <div className={styles.bar}>
                                { isDailyReview && 
                                    <SelfEvaluationBar
                                        selfEvaluation={selfEvaluation} 
                                        setSelfEvaluation={setSelfEvaluation} 
                                        setHasEvaluated={setHasEvaluated} 
                                        isCorrect={isCorrect}
                                    /> 
                                }
                                <Button 
                                    variant="contained"
                                    color="primary"
                                    sx={{
                                        width: "40%",
                                        fontSize: "1rem",
                                        borderRadius: "30px",
                                    }}
                                    onClick={(currentIndex < cards.length - 1) ? handleNext : finishTest}
                                    disabled={isDailyReview && !hasEvaluated}
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
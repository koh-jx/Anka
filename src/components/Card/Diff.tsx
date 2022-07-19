import { ReactElement } from 'react';
import styles from './Card.module.css';

function Diff({  userAnswer, actualAnswer } : { userAnswer: string, actualAnswer: string }): ReactElement {
    const lowercaseAnswer = userAnswer.toLowerCase();
    const lowercaseActualAnswer = actualAnswer.toLowerCase();
    return (    
        <div className={styles.diff}>
            {
                <>
                    { 
                        Array.prototype.map.call(actualAnswer, (letter, index) => {
                            if (lowercaseAnswer[index] === lowercaseActualAnswer[index]) {
                                return <span key={index} className={styles.correct}>{letter}</span>
                            } else {
                                return <span key={index} className={styles.incorrect}>{letter}</span>
                            }
                        })
                    }
                </>
            }
        </div>
    )
}

export default Diff;
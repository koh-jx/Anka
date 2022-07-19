import { ReactElement } from 'react';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';

import styles from "./SelfEvaluationBar.module.css";

export default function SelfEvaluationBar (
  {
    selfEvaluation,
    setSelfEvaluation,
    setHasEvaluated,
    isCorrect,
  }
  : {
    selfEvaluation: number;
    setSelfEvaluation: (selfEvaluation: number) => void;
    setHasEvaluated: (hasEvaluated: boolean) => void;
    isCorrect: boolean;
  }
) : ReactElement {

  const handleSelfEvaluation = (newSelfEvaluation: number) => {
    if (!isCorrect && newSelfEvaluation >= 3) {
      return;
    } else if (selfEvaluation === newSelfEvaluation) {
      setSelfEvaluation(-1);
      setHasEvaluated(false);
    } else {
      setSelfEvaluation(newSelfEvaluation);
      setHasEvaluated(true);
    }
  }
  return (
    <div className={styles.evaluationBar}>
      <SentimentVeryDissatisfiedIcon 
        className={[styles.failure, styles.button, selfEvaluation === 0 ? styles.failureClicked : null].join(' ')} 
        onClick={() => handleSelfEvaluation(0)}
      />
      <SentimentDissatisfiedIcon 
        className={[styles.failure, styles.button, selfEvaluation === 1 ? styles.failureClicked : null].join(' ')} 
        onClick={() => handleSelfEvaluation(1)}
      />
      <SentimentSatisfiedIcon 
        className={[styles.midWarning, styles.button, selfEvaluation === 2 ? styles.midWarningClicked : null].join(' ')} 
        onClick={() => handleSelfEvaluation(2)}
      />
      <SentimentSatisfiedIcon 
        className={[
          isCorrect ? styles.warning : styles.wrongAnswer,
          isCorrect && styles.button, 
          selfEvaluation === 3 && styles.warningClicked
        ].join(' ')}
        onClick={() => handleSelfEvaluation(3)}
      />
      <SentimentSatisfiedAltIcon 
        className={[
          isCorrect ? styles.midSuccess : styles.wrongAnswer, 
          isCorrect && styles.button, 
          selfEvaluation === 4 && styles.midSuccessClicked
        ].join(' ')} 
        onClick={() => handleSelfEvaluation(4)}
      />
      <SentimentVerySatisfiedIcon 
        className={[
          isCorrect ? styles.success : styles.wrongAnswer, 
          isCorrect && styles.button, 
          selfEvaluation === 5 && styles.successClicked
        ].join(' ')} 
        onClick={() => handleSelfEvaluation(5)}
      />
    </div>
  );
}
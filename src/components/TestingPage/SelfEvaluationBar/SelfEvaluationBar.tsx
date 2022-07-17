import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';

import styles from "./SelfEvaluationBar.module.css";

export default function SelfEvaluationBar(
  {
    selfEvaluation,
    setSelfEvaluation,
    setHasEvaluated,
  }
  : {
    selfEvaluation: number;
    setSelfEvaluation: (selfEvaluation: number) => void;
    setHasEvaluated: (hasEvaluated: boolean) => void;
  }
) {

  const handleSelfEvaluation = (newSelfEvaluation: number) => {
    if (selfEvaluation === newSelfEvaluation) {
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
        className={[styles.warning, styles.button, selfEvaluation === 3 ? styles.warningClicked : null].join(' ')}
        onClick={() => handleSelfEvaluation(3)}
      />
      <SentimentSatisfiedAltIcon 
        className={[styles.midSuccess, styles.button, selfEvaluation === 4 ? styles.midSuccessClicked : null].join(' ')} 
        onClick={() => handleSelfEvaluation(4)}
      />
      <SentimentVerySatisfiedIcon 
        className={[styles.success, styles.button, selfEvaluation === 5 ? styles.successClicked : null].join(' ')} 
        onClick={() => handleSelfEvaluation(5)}
      />
    </div>
  );
}
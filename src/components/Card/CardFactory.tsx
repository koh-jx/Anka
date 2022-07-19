import { ReactElement } from 'react';
import { createWordBack, createWordFront, createWordBackAnswer } from './Cardfaces/WordCardface';
import Card from './Card';
import { CardType, CardFace } from '../../common/types';


  
// The main factory method used to create a Card and its corresponding Card Faces
// isFlipped is an optional parameter that disables the flipping of the card on click
//// Instead, the component will control whether the card is flipped or not
export const createCard = (cardInfo : CardType, isFlipped?: boolean) : ReactElement => {
    let front = null;
    // Create Front
    if (cardInfo.front === CardFace.WORD) {
        front = createWordFront(cardInfo.frontCardFaceProps);
    }

    let back = null;
    // Create Back
    if (cardInfo.back === CardFace.WORD) {
        back = createWordBack(cardInfo.backCardFaceProps);
    }

    if (front && back) {
        return (typeof isFlipped !== "undefined") 
            ? <Card frontCardface={front} backCardface={back} tags={cardInfo.tags} isFlipped={isFlipped}/>
            : <Card frontCardface={front} backCardface={back} tags={cardInfo.tags}/>;
    } else {
        return <></>;
    }
}

// Compare the back text with the answer and displays the diff accordingly
// Since this is for the testing suite, isFlipped is not optional
export const createTestAnswerCard = (cardInfo : CardType, isFlipped: boolean, userAnswer: string) : ReactElement => {
    let front = null;
    // Create Front
    if (cardInfo.front === CardFace.WORD) {
        front = createWordFront(cardInfo.frontCardFaceProps);
    }

    let back = null;
    // Create Back
    if (cardInfo.back === CardFace.WORD) {
        back = createWordBackAnswer(cardInfo.backCardFaceProps, userAnswer);
    }

    if (front && back) {
        return <Card frontCardface={front} backCardface={back} tags={cardInfo.tags} isFlipped={isFlipped}/>
    } else {
        return <></>;
    }
}
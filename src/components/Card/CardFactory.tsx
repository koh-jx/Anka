import { ReactElement } from 'react';
import { createWordBack, createWordFront } from './Cardfaces/WordCardface';
import Card from './Card';
import { CardType, CardFace } from '../../common/types';


  
// The main factory method used to create a Card and its corresponding Card Faces
export const createCard = (cardInfo : CardType) : ReactElement => {
    var front = null;
    // Create Front
    if (cardInfo.front === CardFace.WORD) {
        front = createWordFront(cardInfo.frontCardFaceProps);
    }

    var back = null;
    // Create Back
    if (cardInfo.back === CardFace.WORD) {
        back = createWordBack(cardInfo.backCardFaceProps);
    }

    if (front && back) {
        return <Card frontCardface={front} backCardface={back} tags={cardInfo.tags} />;
    } else {
        return <></>;
    }
}
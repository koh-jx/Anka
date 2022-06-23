import { ReactElement } from 'react';
import { createWordBack, createWordFront } from './Cardfaces/WordCardface';
import Card from './Card';

// All types of cardfaces that can be created through this factory method
export enum CardFace {
    WORD = 'word'
}
    
// CardInterface contains everything a card needs to be created
// cardFaceProps contains the properties of the card face (front or back)
export interface CardInterface {
    front: CardFace;
    back: CardFace;
    tags: string[];
    frontCardFaceProps: {
        frontTitle: string;
        frontDescription: string;
    };
    backCardFaceProps: {
        backTitle: string;
        backDescription: string;
    };
}
  
// The main factory method used to create a Card and its corresponding Card Faces
export const createCard = (cardInfo : CardInterface) : ReactElement => {
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
// All types of cardfaces that can be created through the CardFactory factory method
export enum CardFace {
    WORD = 'word'
}
    
// CardType contains everything a card needs to be created or displayed
// cardFaceProps contains the properties of the card face (front or back)
export type CardType = {
    id: string,
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
    // Only not null if the card has already been created (ie retrieved from the database)
    dateCreated?: string;
    lastReviewedDate?: string;
    
    // The SM2-related scores are handled by the backend and is thus not needed here
    // consecutiveRecallCount?: number;
    // easinessFactor?: number;
    interval?: number;
}

export type DeckType = {
    id: string;
    name: string;
    // picture: ???;
    cards: string[];
}
  
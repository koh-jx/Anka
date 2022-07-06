// All types of cardfaces that can be created through the CardFactory factory method
export enum CardFace {
    WORD = 'word'
}
    
// CardType contains everything a card needs to be created
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
}

export type DeckType = {
    id: string;
    name: string;
    // picture: ???;
    cards: string[];
}
  
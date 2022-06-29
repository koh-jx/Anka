import { getAnkaApi } from "./axios";
import {
    createCardApi
} from './cardFunctions';
import { CardType } from '../../components/Card/CardFactory';
import { DeckType } from "../../components/MyDecks/MyDecks";


// Creates a new card, adds the card to the deck
// Returns the new card
export const createCardToDeckApi = async (toAdd: CardType, deckId: string) : Promise<CardType> => {
    return new Promise((resolve, reject) => {
        createCardApi(toAdd).then(card => {
            getAnkaApi()
                .patch('/deck/add-card', {
                    cardId: card.id,
                    id: deckId
                })
                .then(() => {
                    resolve(card);
                })
                .catch(() => {
                    reject();
                })   
        })
    });
}

// Removes a card from the deck
// Returns the deck without the card
export const removeCardFromDeckApi = async (toRemove: CardType, deckId: string) : Promise<DeckType> => {
    return new Promise((resolve, reject) => {
        getAnkaApi()
            .patch('/deck/remove-card', {
                cardId: toRemove.id,
                id: deckId
            })
            .then(({ data }) => {
                resolve(data);
            })
            .catch(() => {
                reject();
            })
    });
}
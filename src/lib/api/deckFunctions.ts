import { getAnkaApi } from "./axios";
import {
    getUserApi,
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

export const getUserDecksApi = async() : Promise<DeckType[]> => {
    return new Promise((resolve, reject) => {
        getUserApi()
            .then(user => {
                const deckStrings = user.decks;
                Promise.all(deckStrings.map(async (deckString) => {
                    return getAnkaApi().get('/deck?id=' + deckString)
                        .then(({ data }) => {
                            return data;
                        });
                }))
                .then((decks) => {
                    resolve(decks);
                })
            })
            .catch(() => {
                reject();
            })
    })
}

// Create deck
// Create new card
export const createDeckApi = async (deck: DeckType): Promise<DeckType> => {
    return new Promise((resolve, reject) => {
        getAnkaApi()
            .post('/deck', {
                name: deck.name,
            })
            .then(({ data }) => {
                resolve(data);
            })
            .catch(() => {
                reject();
            });
    }
    );
}

// Edit deck

// Delete deck
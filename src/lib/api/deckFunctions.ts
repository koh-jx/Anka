import { getAnkaApi } from "./axios";
import {
    createCardApi
} from './cardFunctions';
import { CardType, DeckType } from "../../common/types";


export const getDeckApi = async(id: string) : Promise<DeckType> => {
    return new Promise((resolve, reject) => {
        getAnkaApi()
            .get('/deck?id=' + id)
            .then(({ data }) => {
                resolve(data);
            })
            .catch(() => {
                reject();
            })
    });
}

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

export const getUserDecksApi = async(pageNumber: number) : Promise<DeckType[]> => {
    return new Promise((resolve, reject) => {
        getAnkaApi()
            .get('/users/decks?page=' + pageNumber)
            .then(({ data }) => {
                resolve(data);
            })
            .catch(() => {
                reject();
            })
    });
}

// Create deck
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
export const editDeckApi = async (deck: DeckType): Promise<DeckType> => {
    return new Promise((resolve, reject) => {
        getAnkaApi()
            .patch('/deck', {
                id: deck.id,
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

// Delete deck
export const deleteDeckApi = async (deck: DeckType): Promise<DeckType> => {
    return new Promise((resolve, reject) => {
        getAnkaApi()
            .delete('/deck?id=' + deck.id)
            .then(({ data }) => {
                resolve(data);
            })
            .catch(() => {
                reject();
            });
    }
    );
}

export const getCardsFromDeckIdApi = async (deckId: string, pageNumber: number): Promise<CardType[]> => {
    return new Promise((resolve, reject) => {
        getAnkaApi()
            .get('/deck/cards?id=' + deckId + '&page=' + pageNumber)
            .then(({ data }) => {
                resolve(data);
            })
            .catch(() => {
                reject();
            });
    }
    );
}
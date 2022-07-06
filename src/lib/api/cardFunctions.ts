import { getAnkaApi } from "./axios";
import { CardType } from "../../common/types";

// Get the following data:
// - user.id        : string
// - user.username  : string
// - user.cards     : string[]
// - user.decks     : string[]
export const getUserApi = async (): Promise<{
    id: string;
    username: string;
    cards: string[];
    decks: string[];
}> =>
  new Promise((resolve, reject) => {
    getAnkaApi()
      .get('/users/profile')
      .then(({ data }) => {
        resolve(data);
      })
      .catch(() => {
        reject();
      });
  }
);

// Gets 1 card from the database
export const getCardApi = async (id: string): Promise<CardType> =>
  new Promise((resolve, reject) => {
    getAnkaApi()
      .get('/card?id=' + id)
      .then(({ data }) => {
        resolve(data);
      })
      .catch(() => {
        reject();
      });
  }
);

// Get deck from a given array of ids
export const getDeckFromArrayApi = async (cards: string[]): Promise<CardType[]> => {
    return await Promise.all(
        cards.map(async (card) => getCardApi(card))
    );
};

// Create new card
export const createCardApi = async (card: CardType): Promise<CardType> => {
    return new Promise((resolve, reject) => {
        getAnkaApi()
            .post('/card', {
                front: card.front as string,
                back: card.back as string,
                frontTitle: card.frontCardFaceProps.frontTitle,
                frontDescription: card.frontCardFaceProps.frontDescription,
                backTitle: card.backCardFaceProps.backTitle,
                backDescription: card.backCardFaceProps.backDescription,
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

// Edit card
export const editCardApi = async (card: CardType): Promise<CardType> => {
    return new Promise((resolve, reject) => {
        getAnkaApi()
            .patch('/card', {
                id: card.id,
                front: card.front as string,
                back: card.back as string,
                frontTitle: card.frontCardFaceProps.frontTitle,
                frontDescription: card.frontCardFaceProps.frontDescription,
                backTitle: card.backCardFaceProps.backTitle,
                backDescription: card.backCardFaceProps.backDescription,
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

// Delete card

export const removeCardApi = async (card: CardType): Promise<CardType[]> => {
    return new Promise((resolve, reject) => {
        getAnkaApi()
            .delete('card?id=' + card.id)
                .then(({ data }) => {
                    resolve(data);
                })
                .catch(() => {
                    reject();
                });
    });
}
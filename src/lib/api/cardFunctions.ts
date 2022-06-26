import { getAnkaApi } from "./axios";
import { CardType } from "../../components/Card/CardFactory";

// Get the following data:
// - user.id        : string
// - user.username  : string
// - user.cards     : string[]
export const getUser = async (): Promise<{
    id: string;
    username: string;
    cards: string[];
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

export const getCard = async (id: string): Promise<CardType> =>
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

// Get deck from user's array
export const getDeck = async (cards: string[]): Promise<CardType[]> => {
    return await Promise.all(
        cards.map(async (card) => getCard(card))
    );
};

// Create new card
const createCard = async (card: CardType): Promise<CardType> => {
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

export const createAndAddCardToDeck = async (card: CardType): Promise<CardType[]> => {
    return new Promise((resolve, reject) => {
        createCard(card).then((result) => {
            getAnkaApi()
                .patch('users/deck', {
                    id: result.id,
                })
                .then(({ data }) => {
                    resolve(data);
                })
                .catch(() => {
                    reject();
                });
        });
    });
}

// Edit card
export const editCardInDB = async (card: CardType): Promise<CardType> => {
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
                console.log(data);
                resolve(data);
            })
            .catch(() => {
                reject();
            });
    }
    );
}

// Delete card

export const removeCardFromDeck = async (card: CardType): Promise<CardType[]> => {
    return new Promise((resolve, reject) => {
        getAnkaApi()
            .delete('card?id=' + card.id)
                .then(() => {
                    getAnkaApi()
                        .delete('users/deck?id=' + card.id)
                        .then(({ data }) => {
                            resolve(data);
                        })
                        .catch(() => {
                            reject();
                        });
                });
    });
}
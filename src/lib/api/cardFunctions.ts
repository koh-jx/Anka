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

// Get a page of cards from the database
export const getUserCardsApi = async (page: number): Promise<CardType[]> =>
  new Promise((resolve, reject) => {
    getAnkaApi()
      .get('/users/cards?page=' + page)
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
    return Promise.all(cards.map((card) => getCardApi(card)));
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

export const removeCardByIdApi = async (cardId: string): Promise<CardType[]> => {
  return new Promise((resolve, reject) => {
      getAnkaApi()
          .delete('card?id=' + cardId)
              .then(({ data }) => {
                  resolve(data);
              })
              .catch(() => {
                  reject();
              });
  });
}


export const reviewCardApi = async (cardId: string, selfEvaluation: number) : Promise<CardType> => {
  return new Promise((resolve, reject) => {
    getAnkaApi()
      .patch('/card/review', {
        id: cardId,
        selfEvaluation: selfEvaluation,
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

export const isDueForReview = (card: CardType) => {
  if (!card.lastReviewedDate) {
    return true;
  } else if (card.interval) {
    const daysSinceLastReview = (new Date().getTime() - new Date(card.lastReviewedDate).getTime()) / (1000 * 60 * 60 * 24);
    return daysSinceLastReview >= card.interval;
  } else {
    return false;
  }
}
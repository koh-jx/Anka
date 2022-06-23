import React, { ReactElement } from 'react'
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import { createWordBack, createWordFront } from '../WordCardface/WordCardface';
      
const FlippyStyle = {
    width: '290px',
    height: '210px',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'sans-serif',
    fontSize: '30px',
    justifyContent: 'center',
}

export enum CardFace {
  WORD = 'word'
}
  
export interface CardInterface {
  front: CardFace;
  back: CardFace;
  tags: string[];
  cardFaceProps: any;
}

export const createCard = (cardInfo : CardInterface) : ReactElement => {
  var front = null;
  // Create Front
  if (cardInfo.front === CardFace.WORD) {
    front = createWordFront(cardInfo.cardFaceProps);
  }

  var back = null;
  // Create Back
  if (cardInfo.back === CardFace.WORD) {
    back = createWordBack(cardInfo.cardFaceProps);
  }

  if (front && back) {
    return <Card frontCardface={front} backCardface={back} tags={cardInfo.tags} />;
  } else {
    return <></>;
  }
}


function Card(
  { 
    frontCardface, backCardface, tags
  } : {
    frontCardface: ReactElement,
    backCardface: ReactElement,
    tags: string[],
  }
): ReactElement {

    const DefaultCardContents = ({ children } : { children: any }) => (
        <React.Fragment>
          <FrontSide
            style={{
              backgroundColor: '#bd6508',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              borderRadius: '10px',
            }}
          >
            {frontCardface}
          </FrontSide>
          <BackSide
            style={{
              backgroundColor: '#777',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              borderRadius: '10px',
            }}>
              {backCardface}
          </BackSide>
        </React.Fragment>
    );

    return (    
        <div>
            <Flippy
                flipOnClick={true}
                flipDirection={'horizontal'}
                style={FlippyStyle}
            >
                <DefaultCardContents>
                  Pack name
                </DefaultCardContents>
            </Flippy>
        </div>
    );
}

export default Card;
import React, { ReactElement } from 'react'
import Flippy, { FrontSide, BackSide } from 'react-flippy';
      
const FlippyStyle = {
    width: '290px',
    height: '190px',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'sans-serif',
    fontSize: '30px',
    justifyContent: 'center',
}

// Card Factory uses this template to create a card
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
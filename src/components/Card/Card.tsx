import React, { ReactElement } from 'react'
import Flippy, { FrontSide, BackSide } from 'react-flippy';
      
// Gets the font size, height and width from the parent div container
const FlippyStyle = {
    width: '100%',
    height: '100%',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'roboto',
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
      <Flippy
          flipOnClick={true}
          flipDirection={'horizontal'}
          style={FlippyStyle}
      >
          <DefaultCardContents>
            Placeholder content
          </DefaultCardContents>
      </Flippy>
    );
}

export default Card;
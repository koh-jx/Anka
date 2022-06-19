import React, { ReactElement } from 'react'
import Flippy, { FrontSide, BackSide } from 'react-flippy';
      
const FlippyStyle = {
    width: '200px',
    height: '270px',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'sans-serif',
    fontSize: '30px',
    justifyContent: 'center',
    // margin: '10px auto'
}
  
function Card(): ReactElement {

    const DefaultCardContents = ({ children } : { children: any }) => (
        <React.Fragment>
          <FrontSide
            style={{
              backgroundColor: '#41669d',
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column'
            }}
          >
            RICK
            <span 
              style={{
                fontSize:'12px',
                position: 'absolute',
                bottom: '10px',
                width: '100%'
              }}>
              {children}<br />
              (FRONT SIDE)
            </span>
          </FrontSide>
          <BackSide
            style={{
              backgroundColor: '#175852',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column'
            }}>
            ROCKS
            <span 
              style={{
                fontSize:'12px',
                position: 'absolute',
                bottom: '10px',
                width: '100%'
              }}>
              {children}<br />
              (BACK SIDE)
            </span>
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
                  I flip the card
                </DefaultCardContents>
            </Flippy>
        </div>
    );
}

export default Card;
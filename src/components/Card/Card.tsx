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
  
function Card(
  { 
    frontCardface, backCardface, tags
  } : {
    frontCardface: ReactElement,
    backCardface: ReactElement,
    tags: string[]
  }
): ReactElement {

    const DefaultCardContents = ({ children } : { children: any }) => (
        <React.Fragment>
          <FrontSide
            style={{
              backgroundColor: '#9D6A43',
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column'
            }}
          >
            {frontCardface}
            {/* FRONT
            <span 
              style={{
                fontSize:'12px',
                position: 'absolute',
                bottom: '10px',
                width: '100%'
              }}>
              {children}<br />
              (FRONT SIDE)
            </span> */}
          </FrontSide>
          <BackSide
            style={{
              backgroundColor: '#3e5641',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column'
            }}>
              {backCardface}
            {/* BACK
            <span 
              style={{
                fontSize:'12px',
                position: 'absolute',
                bottom: '10px',
                width: '100%'
              }}>
              {children}<br />
              (BACK SIDE)
            </span> */}
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
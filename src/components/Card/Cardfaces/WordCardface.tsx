import React, { ReactElement } from 'react'


// Factory methods to create a word card face
export const createWordFront = (cardFaceProps: any) : ReactElement => {
  return (<WordCardface title={cardFaceProps.frontTitle} description={cardFaceProps.frontDescription}/>);
}

export const createWordBack = (cardFaceProps: any) : ReactElement => {
  return (<WordCardface title={cardFaceProps.backTitle} description={cardFaceProps.backDescription}/>);
}

// Word card face consisting of a title and a description
// Note that the component is only created through the above functions and should be declared no where else.
function WordCardface(
  {
    title,
    // subtitle,
    description,
    // tags,
  } :
  {
    title: string,
    // subtitle: string,
    description: string,
    // tags,
  }
): ReactElement {
  return (
    <>
      {title}
      <span 
        style={{
          fontSize:'12px',
          position: 'absolute',
          bottom: '10px',
          width: '100%'
        }}>
        {description}
      </span>
    </>
  );  
}
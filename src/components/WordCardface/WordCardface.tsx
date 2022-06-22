import React, { ReactElement } from 'react'

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

export default WordCardface;
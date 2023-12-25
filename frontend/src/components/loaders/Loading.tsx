import { Spinner } from 'react-bootstrap';

import React from 'react'

const Loading = ({size = 50, style}) => {
  return (
    <div style={{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        width:'100%',
        height:'100%',
        ...style
    }}>
        <Spinner style={{
            width:size,
            height:size,
        }}
        animation='grow' 
        />
      
    </div>
  )
}

export default Loading;

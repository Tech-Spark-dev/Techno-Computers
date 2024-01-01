import { Spinner } from 'react-bootstrap';

import React from 'react'

type LoadingTypes = {
  size?: number
  style?: React.CSSProperties
}
const Loading = ({ size = 50, style }: LoadingTypes) => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
      ...style
    }}>
      <Spinner style={{
        width: size,
        height: size,
      }}
        animation='grow'
      />

    </div>
  )
}

export default Loading;

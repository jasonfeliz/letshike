import React from 'react'


const Trail = (props) => {
  return (
    <div>
      <div>{props.data.name}</div>
      <div>{props.state.wind.speed}</div>
    </div>

  )
}

export default Trail

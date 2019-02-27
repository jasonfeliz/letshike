import React from 'react'
import image from '../../images/hiking.jpg'

const Trail = (props) => {
  const iconUrl = props.data.imgSmallMed || image

  return (
      <li className="trailsListItem">
        <div className="itemImg">
          <img src={iconUrl} />
        </div>
        <div className="trailInfo">
          <div className="top">
            <h5>{props.data.name}</h5>
            <span>{props.data.length}</span>
          </div>
          <div className="bottom">
            <p>{props.data.condition}</p>
            <p>{props.data.location}</p>
          </div>
        </div>
      </li>

  )
}

export default Trail

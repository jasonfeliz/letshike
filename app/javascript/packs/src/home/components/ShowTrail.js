import React from 'react'
import image from '../../images/hiking.jpg'
import { Route, Link} from 'react-router-dom'

const ShowTrail = (props) => {
  const iconUrl = props.data.imgSmallMed || image

  return (
      <li className="trailsListItem">
        <div className="itemImg">
          <img src={iconUrl} />
        </div>
        <div className="trailInfo">
          <div className="top">
            <h4>{props.data.name}</h4>
            <span>{props.data.length} Miles</span>
          </div>
          <div className="bottom">
            <p>{props.data.location}</p>
          </div>
        </div>
      </li>

  )
}

export default ShowTrail

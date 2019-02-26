import React, { Component } from 'react'
import { Link, Route} from 'react-router-dom'

import Search from './components/Search'


class Home extends Component {
  constructor(){
    super()

  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render(){
    const homeHtml = (
      <React.Fragment>
        <Search />
      </React.Fragment>
    )

    return (
      <div>
        {homeHtml}
      </div>

    )
  }
}

export default Home

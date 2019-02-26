import React, { Component } from 'react'
import { Link, Route} from 'react-router-dom'

import { getWeatherApi } from '../../api/openWeatherApi.js'
import { getTrailsApi } from '../../api/hikingProjectApi.js'
import Trail from './Trail'

class Search extends Component {
  constructor(){
    super()

    this.state = {
      searchQuery: '',
      filterDistance:'10',
      cityCoord:{},
      main:{},
      wind:'',
      description: [],
      sunrise: '',
      sunset:'',

      searchResults: []
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  submitQuery = (e) => {
    const { searchQuery, filterDistance, searchResults } = this.state
    e.preventDefault()
    getWeatherApi(searchQuery)
      .then((res) => {
        this.setState({
          cityCoord: res.data.coord,
          main: res.data.main,
          wind: res.data.wind,
          sunrise: res.data.sys.sunrise,
          sunset: res.data.sys.sunset,
          description: res.data.weather.map((element) => {
            return element.description
          })
        })
      })
      .then(() => {
        const { cityCoord, filterDistance } = this.state
        return getTrailsApi(cityCoord.lon,cityCoord.lat,filterDistance)
      })
      .then((res) => {

        this.setState({
          searchResults: res.data.trails.map((element) => {
            return element
          })
        })

      })
      .then(() => console.log(this.state))
  }


  render(){
    const { searchQuery, filterDistance, searchResults  } = this.state
    const TrailsList = searchResults.map((trail,index) => {
      return (
        <Trail key={index} data={trail} state={this.state} />
      )
    })

    const searchHtml = (
      <React.Fragment>
        <div className="search">
          <form onSubmit={this.submitQuery}>
            <div>
              <label htmlFor="searchQuery">Search trails by City: </label>
              <input
                required
                type="text"
                name="searchQuery"
                value={searchQuery}
                placeholder="Enter City"
                onChange={this.handleChange}
              />
            <button type="submit">Search</button>
            </div>
            <div>
              <label htmlFor="filterDistance">Distance: </label>
              <select required type="text" name="filterDistance" value={filterDistance} onChange={this.handleChange} >
                <option value="10" >10 miles</option>
                <option value="50">50 miles</option>
              </select>
            </div>

          </form>

        </div>

      </React.Fragment>
    )


    return (
      <div>
        {searchHtml}
        {TrailsList}
      </div>

    )
  }
}

export default Search

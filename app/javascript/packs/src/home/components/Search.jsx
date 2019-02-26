import React, { Component } from 'react'
import { Link, Route} from 'react-router-dom'

import { getWeatherApi } from '../../api/openWeatherApi.js'
import { getTrailsApi } from '../../api/hikingProjectApi.js'
import Trail from './Trail'
import Weather from './Weather'

class Search extends Component {
  constructor(){
    super()

    this.state = {
      currentTime: '',
      searchQuery: '',
      filterDistance:'10',
      cityName: '',
      cityCoord:{},
      main:{},
      wind:'',
      description: {},
      sunrise: [],
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
        console.log(res.data)
        const sunrise = new Date(res.data.sys.sunrise)
        const sunset = new Date(res.data.sys.sunset)
        this.setState({
          cityName: res.data.name,
          cityCoord: res.data.coord,
          main: res.data.main,
          wind: res.data.wind,
          sunrise: sunrise.toLocaleTimeString('en-US'),
          sunset: sunset.toLocaleTimeString('en-US'),
          description: res.data.weather[0]
        })
        console.log(this.state.sunrise)
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
        <Trail key={index} data={trail} />
      )
    })

    const weatherHtml = (
      <React.Fragment>
        <Weather data={this.state} />
      </React.Fragment>
    )

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
        {weatherHtml}
        {TrailsList}
      </div>

    )
  }
}

export default Search

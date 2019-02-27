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
      filterDistance:'30',
      cityName: '',
      cityCoord:{},
      main:{},
      wind:'',
      description: {},
      sunrise: [],
      sunset:'',
      searchResults: [],
      recommendation: ''
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
        const sunrise = new Date(res.data.sys.sunrise*1000)
        const sunset = new Date(res.data.sys.sunset*1000)
        res.data.main.temp = Math.ceil(res.data.main.temp)

        this.setState({
          cityName: res.data.name,
          cityCoord: res.data.coord,
          main: res.data.main,
          wind: res.data.wind,
          sunrise: sunrise.toLocaleTimeString('en-US'),
          sunset: sunset.toLocaleTimeString('en-US'),
          description: res.data.weather[0]
        })

      })
      .then(() => {
        const { cityCoord, filterDistance, } = this.state
        return getTrailsApi(cityCoord.lon,cityCoord.lat,filterDistance)
      })
      .then((res) => {

        this.setState({
          searchResults: res.data.trails.map((element) => {
            return element
          })
        })
        console.log(this.state.searchResults)

      })
      .then(() => {
        const { main, wind } = this.state
        let rec = ""
        if((main.temp >= 65 && main.temp <= 85)){
          rec = "Perfect weather for hiking - Get out and be the explorer you were born to be!"
        }else if ((main.temp >= 45 && main.temp <= 64)){
          rec = "Weather is good for hiking - Bring a light jacket and plenty of curiosity!"
        }else if ((main.temp >= 25 && main.temp <= 44)){
          rec = "Temperatures are expected to be cold today -- if you decide to go for a stroll into the woods, make sure to cover up!"
        }else if (main.temp <= 24){
          rec = "It's going to be bitter cold out there -- Not recommended to get out. Stay home and read a good book by the fire!"
        }else if ((main.temp >= 85)){
          rec = "It's a scorcher out there today, folks -- Not recommened to get out but if you do, bring plenty of water and find ways to stay cool!"
        }else {
          rec = "Not enough info for recommendation."
        }

        this.setState({
          recommendation: rec
        })
      })
  }


  render(){
    const { searchQuery, filterDistance, searchResults, recommendation  } = this.state
    const TrailsList = searchResults.map((trail,index) => {
      return (
        <Trail key={index} data={trail} />
      )
    })

    const weatherHtml = (
      <React.Fragment>
        <Weather data={this.state} recommendation={recommendation}/>
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
                <option value="30" >30 miles</option>
                <option value="100">100 miles</option>
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
        <ul className="trailsList">
          {TrailsList}
        </ul>

      </div>

    )
  }
}

export default Search

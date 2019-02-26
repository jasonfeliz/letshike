import React, { Component } from 'react'


class Weather extends Component {
  constructor(props){
    super(props)

  }

  render() {
    const { main, description, cityName, wind, sunrise, sunset } = this.props.data
    const iconUrl = 'http://openweathermap.org/img/w/' + description.icon + '.png'

    const weatherHtml = (
      <div className="weather">
        <h3 className="cityName">{this.props.data.cityName && `Current weather in ${cityName}`}</h3>
        <div className="weatherInfo">
          <ul className="weatherData">
            <li className="tempConditions">
              <div>
                {main.temp}  &#8457;
                <img src={iconUrl}  />
              </div>
              <span>{description.description}</span>
            </li>
            <li>Wind Speed: {wind.speed}</li>
            <li>Pressure: {main.pressure}</li>
            <li>Humidity: {main.humidity}%</li>
            <li>Sunrise time: {sunrise}</li>
            <li>sunset time: {sunset}</li>

          </ul>
          <div className="hikingRecommendations">

          </div>
        </div>

      </div>
    )
    return (

      <React.Fragment>
        {this.props.data.cityName ? weatherHtml : '' }
      </React.Fragment>


    )
  }

}

export default Weather

require('dotenv').config()
const apiKey = process.env.OPEN_WEATHER_API_KEY

import axios from 'axios'
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=imperial`

export const getWeatherApi = (cityName) => {
  return axios.get(apiUrl + `&q=${cityName},us`)
}

// sample openWeather api call https://api.openweathermap.org/data/2.5/weather?q=London&appid=3570e24827f15919830e9bb1d15bcbf9
import axios from 'axios'
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?appid=3570e24827f15919830e9bb1d15bcbf9&units=imperial'

export const getWeatherApi = (cityName) => {
  return axios.get(apiUrl + `&q=${cityName},us`)
}

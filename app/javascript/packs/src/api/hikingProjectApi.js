require('dotenv').config()
const apiKey = process.env.HIKING_WEATHER_API_KEY
import axios from 'axios'


const apiUrl = `https://www.hikingproject.com/data/get-trails?key=${apiKey}&sort=quality&maxResults=10`


export const getTrailsApi = (lon,lat,dist) => {
  return axios.get(apiUrl + `&lon=${lon}&lat=${lat}&maxDistance=${dist}`)
}

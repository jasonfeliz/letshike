
//sample hiking project api call https://www.hikingproject.com/data/get-trails?lat=40.0274&lon=-105.2519&maxDistance=10&key=200413544-78e03cf515438a6fda98a6e6105dd262
import axios from 'axios'
const apiUrl = 'https://www.hikingproject.com/data/get-trails?key=200413544-78e03cf515438a6fda98a6e6105dd262&sort=distance&maxResults=20'


export const getTrailsApi = (lon,lat,dist) => {
  return axios.get(apiUrl + `&lon=${lon}&lat=${lat}&maxDistance=${dist}`)
}

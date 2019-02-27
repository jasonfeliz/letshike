## LetsHike

## Planning
LetsHike is a Hiking Trails web application that uses 3rd-party api to get hiking trails near a given location  and its respective weather. The app will issue recommendations — hike or don’t hike —  to users based on the weather of where the trail is located. It will uses Hiking Project API for trails and OpenWeather API for locations. When a user enters a city name, the app will query the OpenWeather API; grab the weather info and coordinates; use coordinates to query Hiking Project API. Also, the app will ask permission from the user to use current location to pull in 5-10 ‘featured’ hiking trails near the user

## Technologies
* ReactJs
* Ruby on Rails
* PostgresSql
* Hiking Project API
* OpenWeather API


## User Stories - MVP
* As a user, I will be able to sign up
* As a user, I will be able to sign in
* As a user, I will be able to sign out
* As a user, I will be able to search for a hiking trail or trails at or near a location — city name and by distance to the city
* As a user, I will be able to see an individual trail
* As a user, I will be able to get the weather for a hiking trail or trails
* As a user, I will be able to get a recommendation, based on the weather for a hiking trail


## Data Structure

User
* Username
* Password
* Favorite trails
Favorite trails
* Trail name
Trail
* Name
* type
* Summary
* difficulty
* Stars
* location
* Images
* Condition status
* Condition details
* Last update on conditions
Weather
* temp
* Min temp
* Max temp
* Humidity
* Description
* Sunrise
* Sunset


## ERD
https://i.imgur.com/CXnB4ed.png

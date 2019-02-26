import React, { Component } from 'react'
import { Link, Route} from 'react-router-dom'

class Search extends Component {
  constructor(){
    super()

    this.state = {
      searchQuery: '',
      filterDistance:'',
      weatherResults:[],
      searchResults: []
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  submitQuery = (e) => {
    e.preventDefault()
    console.log('i sbumited something')
  }
  render(){
    const { searchQuery, filterDistance, searchResults } = this.state
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
      </div>

    )
  }
}

export default Search

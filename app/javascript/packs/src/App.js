import React, { Component } from 'react'
import { Route, Link} from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie';

import apiUrl from './api_config.js'
import { checkUser } from './auth/auth_api'
import Header from './header/Header.js'
import AuthenticatedRoute from './auth/components/AuthenticatedRoute.js'
import SignIn from './auth/components/SignIn.js'
import SignUp from './auth/components/SignUp.js'
import SignOut from './auth/components/SignOut.js'
import ChangePassword from './auth/components/ChangePassword.js'
import Home from './home/Home.js'
import image from './images/hiking.jpg'

class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      user: null,
      loggedIn: Cookies.get('a_t') ? true : false,
      flashMessage: '',
      messageType: null
    }
  }

  setUser = (loggedInUser) => {
    this.setState({user: loggedInUser,loggedIn:true})
  }

  clearUser = () => {
    this.setState({user: null,loggedIn:false})
  }

  displayFlash = (message, type) => {
    this.setState({ flashMessage: message, messageType: type})

    setTimeout(() => this.setState({flashMessage: null }),2000)
  }

  componentDidMount () {
    axios.get(`${apiUrl}/check_user`)
      .then((res) => {this.setUser(res.user)})
      .catch(() => {this.clearUser})
  }
  render() {

    const { user, loggedIn, flashMessage, messageType } = this.state

    const landingPageHtml = (
      <React.Fragment>

        <div className="landingPageCanvas">
          <div>
              <img src={image}/>
          </div>
          <div>
              <h2>Welcome to LetsHike!</h2>
              <p>LetsHike is an awesome app for the hiking aficionado that uses
                uses Hiking Project API to gather trails near a given location and
                OpenWeather API for local weather. Sign Up -- it's free!
               </p>
          </div>
        </div>

      </React.Fragment>
    )

    const mainHtml = (
      <React.Fragment>
        <Header user={user} loggedIn={loggedIn}/>
        {flashMessage && <div className={messageType}>{flashMessage}</div>}
        <main className='container'>
          <Route exact path='/' render={() => (
              landingPageHtml
            )}
          />
          <Route path='/sign-up' render={() => (
              <SignUp setUser={this.setUser} flash={this.displayFlash} />
            )}
          />
          <Route path='/sign-in' render={() => (
              <SignIn setUser={this.setUser} flash={this.displayFlash} />
            )}
          />
          <AuthenticatedRoute path='/sign-out' loggedIn={loggedIn} render={() => (
              <SignOut clearUser={this.clearUser} flash={this.displayFlash} />
            )}
          />
          <AuthenticatedRoute path='/change-password' loggedIn={loggedIn} render={() => (
              <ChangePassword user={user} flash={this.displayFlash} />
            )}
          />
          <AuthenticatedRoute path='/home' loggedIn={loggedIn} render={() => (
              <Home user={user} flash={this.displayFlash} />
            )}
          />
        </main>
      </React.Fragment>
    )




    return (
      <React.Fragment>
        {mainHtml}
      </React.Fragment>

    )
  }
}

export default App

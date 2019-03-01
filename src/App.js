import React, { Component, Fragment } from 'react';
import 'semantic-ui-css/semantic.min.css'
import './App.css';
import NavBar from './components/NavBar'
import RegionContainer from './containers/RegionContainer'
import MountainContainer from './containers/MountainContainer'
import MountainDetails from './components/MountainDetails'
import NewEdit from './components/NewEdit'
import NewEditRegion from './components/NewEditRegion'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Welcome from './components/Welcome'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import './style/css/weather-icons.min.css'
import './style/css/animations.css'
import {Sticky} from 'semantic-ui-react'
import { URL } from './constants/constants'
const Cookies = require('cookies-js')

class App extends Component {
  constructor() {
    super()
    this.state = {
      userData: null
    }
  }

  // if JWT token exists in cookies, fetch that user's data
  componentDidMount() {
    Cookies.get('token') && this.userFetch()
  }

  // upon successful user data fetch, set user object with all associated data in state
  setUser = (user) => {
    this.setState({ userData: user })
  }

  // fetch user data, relies on JWT token
  userFetch = () => {
    const token = Cookies.get('token')
    const url = URL + '/profile'
    fetch(url, {
      method: 'GET',
      headers: {
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}` 
      }
    })
      .then(res => res.json())
      .then(data => this.setState({userData: data.user}))
  }

  render() {
    const {userData} = this.state
    return (
      <BrowserRouter>
        <Fragment>
          
          {/* only show navbar if user object exists in state (i.e. after logging in) */}
          { userData ? (
            <Sticky>
              <NavBar userData={userData} setUser={this.setUser}/>
            </Sticky>
            ) : null }
          
          <div className='padded-sides'>
            <Switch>
              
              <Route exact path='/' render={() => <Redirect to='/login'/>} />

              <Route path='/login' render={() => (
                <Login setUser={this.setUser} />
              )} />

              <Route path='/signup' render={() => <SignUp setUser={this.setUser}/>} />
              
              <Route path='/home' render={() => (
                userData ? ( 
                  <Fragment>
                    <Welcome/>
                    <RegionContainer regions={userData.regions}/>
                    <MountainContainer mountains={userData.mountains}/>
                  </Fragment> 
                ) : null
              )} />

              <Route path='/regions/new' render={() => (
                userData ? (
                  <NewEditRegion 
                    userId={userData.id} 
                    userFetch={this.userFetch}
                    allMtns={userData.mountains}
                  />
                ) : null
              )}/>

              <Route path='/regions/:id/edit' render={(props) => {
                let rgnId = props.match.params.id
                return userData ? (
                  <NewEditRegion 
                    region={userData.regions.find(rgn => rgn.id == rgnId)} 
                    userId={userData.id} 
                    userFetch={this.userFetch} 
                    allMtns={userData.mountains}/>
                ) : null
              }} />
              
              <Route path='/regions/:id' render={(props) => {
                let rgnId = parseInt(props.match.params.id)
                console.log(rgnId)
                return userData ? (
                  <MountainContainer 
                    // mountains={userData.mountains.filter(mtn => mtn.region_id == rgnId)}
                    mountains={userData.regions.find(rgn => rgn.id == rgnId).mountains}
                    region={userData.regions.find(rgn => rgn.id == rgnId)} 
                    userFetch={this.userFetch}/>
                ) : null
              }} />
              
              <Route path='/regions' render={() => (
                userData ? <RegionContainer regions={userData.regions}/> : null
              )} />
              
              <Route path='/mountains/new' render={() => (
                userData ? (
                  <NewEdit regions={userData.regions} userId={userData.id} userFetch={this.userFetch}/>
                ) : null
              )} />

              <Route path='/mountains/:id/edit' render={(props) => {
                let mtnId = props.match.params.id
                return userData ? (
                  <NewEdit regions={userData.regions} userId={userData.id} userFetch={this.userFetch} mountain={userData.mountains.find(mtn => mtn.id == mtnId)}/>
                ) : null
              }} />

              <Route path='/mountains/:id' render={(props) => {
                let mtnId = props.match.params.id
                return userData ? (
                  <MountainDetails mountain={userData.mountains.find(mtn => mtn.id == mtnId)} userFetch={this.userFetch} userData={userData}/>
                ) : null
              }} />
              
              <Route path='/mountains' render={() => (
                userData ? <MountainContainer mountains={userData.mountains}/> : null
              )} />

            </Switch>
          </div>
        </Fragment>
      </BrowserRouter>
    )
  }
}

export default App;

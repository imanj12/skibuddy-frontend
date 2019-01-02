import React, { Component, Fragment } from 'react';
import 'semantic-ui-css/semantic.min.css'
// import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar'
import RegionContainer from './containers/RegionContainer'
import MountainContainer from './containers/MountainContainer'
import MountainDetails from './components/MountainDetails'
import NewEdit from './components/NewEdit'
import NewEditRegion from './components/NewEditRegion'
import Login from './components/Login'
import SignUp from './components/SignUp'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import './style/css/weather-icons.min.css'
const Cookies = require('cookies-js')

class App extends Component {
  constructor() {
    super()
    this.state = {
      userData: null
    }
  }

  componentDidMount() {
    Cookies.get('token') && this.userFetch()
  }

  setUser = (user) => {
    this.setState({ userData: user })
  }

  // fetch data of specific user if already logged in
  userFetch = () => {
    const token = Cookies.get('token')
    const url = 'http://localhost:3000/profile'
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
          {userData ? <NavBar userData={userData} setUser={this.setUser}/> : null}
          <Switch>
            <Route exact path='/' render={() => <Redirect to='/login'/>} />

            <Route path='/login' render={() => (
              <Login setUser={this.setUser} setBackground={this.setBackground} clearBackground={this.clearBackground}/>
            )} />

            <Route path='/signup' render={() => <SignUp />} />
            
            <Route path='/home' render={() => (
              userData ? ( 
                <Fragment>
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
                <NewEditRegion region={userData.regions.find(rgn => rgn.id == rgnId)} userId={userData.id} userFetch={this.userFetch} allMtns={userData.mountains}/>
              ) : null
            }} />
            
            <Route path='/regions/:id' render={(props) => {
              let rgnId = parseInt(props.match.params.id)
              return userData ? (
                <MountainContainer mountains={userData.mountains.filter(mtn => mtn.region_id === rgnId)} region={userData.regions.find(rgn => rgn.id == rgnId)} userFetch={this.userFetch}/>
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
        </Fragment>
      </BrowserRouter>
    )
  }
}

export default App;

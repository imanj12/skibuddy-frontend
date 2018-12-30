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
import {Grid} from 'semantic-ui-react'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import './style/css/weather-icons.min.css'

class App extends Component {
  constructor() {
    super()
    this.state = {
      userData: null
    }
  }

  componentDidMount() {
    // this.userLogin('iman', 'iman')
  }

  setUser = (user) => {
    this.setState({ userData: user })
  }

  // fetch data of specific user - deprecated possibly
  userFetch = () => {
    fetch('http://localhost:3000/users/1')
      .then(res => res.json())
      .then(userData => this.setState({userData: userData}))
  }

  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <NavBar />
          <Switch>
            <Route exact path='/' render={() => <Redirect to='/login'/>} />

            <Route path='/login' render={() => (
              <Login userData={this.state.userData} setUser={this.setUser}/>
            )} />

            <Route path='/signup' render={() => <SignUp />} />
            
            <Route path='/home' render={() => (
              <Grid columns={5} stackable centered>
                <Grid.Row>
                  <RegionContainer regions={this.state.userData ? this.state.userData.regions : null}/>
                </Grid.Row>
                <Grid.Row>
                  <MountainContainer mountains={this.state.userData ? this.state.userData.mountains : null}/>
                </Grid.Row>
              </Grid>
            )} /> 

            <Route path='/regions/new' render={() => (
              <NewEditRegion userId={this.state.userData ? this.state.userData.id : null} userFetch={this.userFetch}/>
            )} />
            
            <Route path='/regions/:id' render={(props) => {
              let rgnId = parseInt(props.match.params.id)
              return (
                <Grid columns={5} stackable centered>
                  <Grid.Row>
                    <MountainContainer mountains={this.state.userData ? this.state.userData.mountains.filter(mtn => mtn.region_id === rgnId) : null}/>
                  </Grid.Row>
                </Grid>
              )
            }} />
            
            <Route path='/regions' render={() => (
              <Grid columns={5} stackable centered>
                <Grid.Row>
                  <RegionContainer regions={this.state.userData ? this.state.userData.regions : null}/>
                </Grid.Row>
              </Grid>
            )} />
            
            <Route path='/mountains/new' render={() => (
              <NewEdit regions={this.state.userData ? this.state.userData.regions : null} userId={this.state.userData ? this.state.userData.id : null} userFetch={this.userFetch}/>
            )} />

            <Route path='/mountains/:id/edit' render={(props) => {
              let chosenMtn = this.state.userData.mountains.find(mtn => mtn.id == props.match.params.id)
              return <NewEdit regions={this.state.userData ? this.state.userData.regions : null} userId={this.state.userData ? this.state.userData.id : null} userFetch={this.userFetch} mountain={chosenMtn}/>
            }} />

            <Route path='/mountains/:id' render={(props) => {
              let mtnId = props.match.params.id
              return <MountainDetails mountain={this.state.userData ? this.state.userData.mountains.find(mtn => mtn.id == mtnId) : null} userFetch={this.userFetch}/>
            }} />
            
            <Route path='/mountains' render={() => (
              <Grid columns={5} stackable centered>
                <Grid.Row>
                  <MountainContainer mountains={this.state.userData ? this.state.userData.mountains : null}/>
                </Grid.Row>
              </Grid>
            )} />

          </Switch>
        </Fragment>
      </BrowserRouter>
    )
  }
}

export default App;

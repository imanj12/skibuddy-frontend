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
import {Grid, Segment} from 'semantic-ui-react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import './style/css/weather-icons.min.css'

class App extends Component {
  constructor() {
    super()
    this.state = {
      userData: null
    }
  }

  componentDidMount() {
    this.userFetch()
  }

  // fetch data of specific user
  userFetch = () => {
    fetch('http://localhost:3000/users/1')
      .then(res => res.json())
      .then(userData => this.setState({userData: userData}))
  }

  // get unique regions
  getUserRegions = () => {
    const regions = this.state.userData.regions
    const result = []
    const map = new Map()
    for (const region of regions) {
        if(!map.has(region.id)){
            map.set(region.id, true)
            result.push({
                id: region.id,
                name: region.name
            })
        }
    }
    return result
  }

  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <NavBar />
          <Switch>
            <Route exact path='/' render={() => (
              <Fragment>
              <Grid columns={5} stackable centered>
                <Grid.Row>
                  <RegionContainer regions={this.state.userData ? this.getUserRegions() : null}/>
                </Grid.Row>
                <Grid.Row>
                  <MountainContainer mountains={this.state.userData ? this.state.userData.mountains : null}/>
                </Grid.Row>
              </Grid>
            </Fragment>
            )} /> 
            
            <Route path='/regions/:id' render={(props) => {
              let rgnId = props.match.params.id
              return (
                <Grid columns={5} stackable centered>
                  <Grid.Row>
                    <MountainContainer mountains={this.state.userData ? this.state.userData.mountains.filter(mtn => mtn.region_id == rgnId) : null}/>
                  </Grid.Row>
                </Grid>
              )
            }}/>
            
            <Route path='/regions' render={() => (
              <Grid columns={5} stackable centered>
                <Grid.Row>
                  <RegionContainer regions={this.state.userData ? this.getUserRegions() : null}/>
                </Grid.Row>
              </Grid>
            )} />
            
            <Route path='/mountains/:id' render={(props) => {
              let mtnId = props.match.params.id
              return <MountainDetails mountain={this.state.userData ? this.state.userData.mountains.find(mtn => mtn.id == mtnId) : null}/>
            }} />
            
            <Route path='/mountains' render={() => (
              <Grid columns={5} stackable centered>
                <Grid.Row>
                  <MountainContainer mountains={this.state.userData ? this.state.userData.mountains : null}/>
                </Grid.Row>
              </Grid>
            )} />

            <Route path='/new' render={() => (
              <Grid columns={1} stackable centered>
                <Grid.Row>
                  <NewEdit regions={this.state.userData ? this.getUserRegions() : null} userId={this.state.userData ? this.state.userData.id : null} userFetch={this.userFetch}/>
                </Grid.Row>
              </Grid>
            )}/>

            <Route path='/newregion' render={() => (
              <Grid columns={1} stackable centered>
                <Grid.Row>
                  <NewEditRegion />
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

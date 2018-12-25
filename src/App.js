import React, { Component, Fragment } from 'react';
import 'semantic-ui-css/semantic.min.css'
import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar'
import RegionContainer from './containers/RegionContainer'
import MountainContainer from './containers/MountainContainer'
import MountainDetails from './components/MountainDetails'
import {Grid, Segment} from 'semantic-ui-react'

class App extends Component {
  constructor() {
    super()
    this.state = {
      userData: null,
      region: null,
      mountain: null
    }
  }

  // fetch data of specific user
  componentDidMount() {
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
      <Grid columns={2} stackable>
        <Grid.Column width={6}>
          <NavBar />
        </Grid.Column>
        <Grid.Column width={10}>
          <RegionContainer regions={this.state.userData ? this.getUserRegions() : null}/>
          <MountainContainer />
          <MountainDetails />
        </Grid.Column>  
      </Grid>
    )
  }
}

export default App;

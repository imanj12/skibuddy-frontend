import _ from 'lodash'
import React, { Component } from 'react'
import { Menu, Search } from 'semantic-ui-react'
import {Link, withRouter} from 'react-router-dom'
import logo from '../style/images/logo.png'
const Cookies = require('cookies-js')
let searchResults = []

class NavBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeItem: '',
      isLoading: false,
      value: '',
      results: []
    }
    // create object to be queried against in search bar
    this.createSearchResults()
  }

  componentDidUpdate(prevProps) {
    // update object to be queried against in search bar if the user data object gets updated (i.e. a mountain/region is edited/created)
    if (prevProps.userData !== this.props.userData) {
      this.createSearchResults()
    }
  }

  // create object to be queried against in search bar
  createSearchResults = () => {
    searchResults = []
    this.props.userData.regions.forEach(region => searchResults.push( {title: region.name, description: 'Region', id: region.id} ))
    this.props.userData.mountains.forEach(mountain => searchResults.push( {title: mountain.name, description: 'Mountain', id: mountain.id} ))
  }

  // handle navbar button highlighting when clicked
  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
    
    if (name === 'logout') {
      Cookies.expire('token')
      this.props.setUser(null)
      this.props.history.push('/')
    } else if (name === 'logo') {
      this.setState({activeItem: ''})
    }
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

  // handle clicking an item in search results depending on whether it's a mountain or region
  handleResultSelect = (e, { result }) => {
    this.setState({ value: '' })
    if (result.description === 'Region') {
      this.props.history.push(`/regions/${result.id}`)
    } else if (result.description === 'Mountain') {
      this.props.history.push(`/mountains/${result.id}`)
    }
  }

  // handle search input and loading icon
  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.title)

      this.setState({
        isLoading: false,
        results: _.filter(searchResults, isMatch),
      })
    }, 300)
  }
 
  render() {
    const { activeItem } = this.state

    return (
      <Menu secondary color='blue' inverted>
        <Menu.Item as={Link} to='/' name ='logo' onClick={this.handleItemClick}>
          <img alt='' src={logo}></img><strong>SkiBuddy</strong>
        </Menu.Item>
        
        <Menu.Item as={Link} to='/regions'
          name='regions'
          active={activeItem === 'regions'}
          onClick={this.handleItemClick}
        />
        
        <Menu.Item as={Link} to='/mountains'
          name='mountains'
          active={activeItem === 'mountains'}
          onClick={this.handleItemClick}
        />
        
        <Menu.Menu position='right'>
          <Menu.Item as={Link} to='/regions/new'
            name='new region'
            active={activeItem === 'new region'}
            onClick={this.handleItemClick}
          />
          
          <Menu.Item as={Link} to='/mountains/new'
            name='new mountain'
            active={activeItem === 'new mountain'}
            onClick={this.handleItemClick}
          />
        
          <Menu.Item>
            <Search
              placeholder='Search'
              loading={this.state.isLoading}
              onResultSelect={this.handleResultSelect}
              onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
              results={this.state.results}
              value={this.state.value}
            />
          </Menu.Item>
          
          <Menu.Item
            name={Cookies.get('token') ? 'logout' : 'log-in'}
            onClick={this.handleItemClick}
          />
        </Menu.Menu>
      </Menu>
    )
  }
}

export default withRouter(NavBar)

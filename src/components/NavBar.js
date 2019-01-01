import React, { Component } from 'react'
import { Input, Menu } from 'semantic-ui-react'
import {Link, withRouter} from 'react-router-dom'
import logo from '../style/images/logo.png'
const Cookies = require('cookies-js')

class NavBar extends Component {
   state = { 
     activeItem: 'home' ,
     isLoading: false,
     value: null,
     results: []
    }
 
   handleItemClick = (e, { name }) => {
     this.setState({ activeItem: name })
     if (name === 'logout') {
       Cookies.expire('token')
       this.props.history.push('/')
     }
   }
 
   render() {
     const { activeItem } = this.state
 
     return (
       <Menu secondary color='blue' inverted>
        <Menu.Item>
          <img alt='' src={logo}></img>
          SkiBuddy
        </Menu.Item>
         <Menu.Item as={Link} to='/' 
          name='home' 
          active={activeItem === 'home'} 
          onClick={this.handleItemClick}
         />
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
             <Input icon='search' placeholder='Search...' />
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

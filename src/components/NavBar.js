import React, { Component } from 'react'
import { Input, Menu } from 'semantic-ui-react'
import {Link} from 'react-router-dom'

export default class NavBar extends Component {
   state = { activeItem: 'home' }
 
   handleItemClick = (e, { name }) => this.setState({ activeItem: name })
 
   render() {
     const { activeItem } = this.state
 
     return (
       <Menu pointing>
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
         <Menu.Item as={Link} to='/mountains/new'
           name='new mountain'
           active={activeItem === 'new mountain'}
           onClick={this.handleItemClick}
         />
         <Menu.Item as={Link} to='/regions/new'
           name='new region'
           active={activeItem === 'new region'}
           onClick={this.handleItemClick}
         />
         <Menu.Menu position='right'>
           <Menu.Item>
             <Input icon='search' placeholder='Search...' />
           </Menu.Item>
           <Menu.Item
             name='logout'
             active={activeItem === 'logout'}
             onClick={this.handleItemClick}
           />
         </Menu.Menu>
       </Menu>
     )
   }
 }

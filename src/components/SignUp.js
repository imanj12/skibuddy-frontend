import React, {Component} from 'react'
import {Form, Button, Grid, Header, Message} from 'semantic-ui-react'
import {URL} from '../constants/constants'
const Cookies = require('cookies-js')
const Capitalize = require('lodash/capitalize')

class SignUp extends Component {
   state = {
      username: '',
      password: '',
      rePassword: '',
      address: '',
      city: '',
      state: '',
      errors: null
   }

   handleChange = (event, data) => {
      this.setState({ [data.name]: data.value })
   }

   handleSubmit = (event) => {
      event.preventDefault()
      this.postUser()
   }

   // create user
   postUser = () => {
      let data = { user: {
         username: this.state.username,
         password: this.state.password,
         password_confirmation: this.state.password,
         address: this.state.address,
         city: this.state.city,
         state: this.state.state
      }}
      
      const url = URL + '/users'
      let method = 'POST'

      fetch(url, {
         method: method,
         headers: {
            'Content-Type':'application/json',
         },
         body: JSON.stringify(data)
      })
         .then(r => r.json())
         .then(data => {
            console.log(data)
            if (data.errors) {
               console.log(data.errors)
               this.setState({errors: data.errors})
            } else {
               Cookies.set('token', data.jwt)
               this.props.setUser(data.user)
               this.props.history.push('/home')
            }
         })
   }

   // create list of states for state dropdown form
   getStates = () => {
      // semantic UI select options in this format:
      // [{ key: 'af', value: 'af', text: 'Afghanistan' }, ...{}]
      let usaStates = require('usa-states').UsaStates
      let usStates = new usaStates().states
      let states = []
      for (let i=0; i<usStates.length; i++) {
         states.push({ key: usStates[i].abbreviation, value: usStates[i].abbreviation, text: usStates[i].name})
      }
      return states
   }

   // if errors are returned after create user fetch, then set errors in state, then invoke this function to list to user in a message
   mapErrors = () => {
      const keys = Object.keys(this.state.errors)
      return keys.map(key => {
         let field = Capitalize(key)
         field = field.replace('-', ' ')
         const message = this.state.errors[key]
         return `${field} ${message}`
      })
   }

   render() {
      return (
         <Grid textAlign='center' verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
               <Header as='h2' color='blue' textAlign='center'>
                  Create an account
               </Header>
               
               <Form onSubmit={this.handleSubmit} >
               
                  {/* show errors if backend produces them */}
                  {this.state.errors ? (
                     <Message
                        negative
                        header='Error'
                        list={this.mapErrors()}
                     />) : null}
                  
                  <Form.Input required name='username' label='Username' placeholder='Username' onChange={this.handleChange} />
                  
                  <Form.Group widths='equal'>
                     <Form.Input required name='password' label='Password' placeholder='Password' type='password' onChange={this.handleChange} />
                     <Form.Input required name='rePassword' label='Re-enter Password' placeholder='Password' type='password' onChange={this.handleChange} />
                  </Form.Group>
                  

                  {/* <Form.Input name='address' label='Street' placeholder='Street Address' onChange={this.handleChange} />
                  <Form.Group widths='equal'>
                     <Form.Input required name='city' label ='City' placeholder='City' onChange={this.handleChange} />
                     <Form.Select required search name='state' label='State' value={this.state.state} placeholder='Select one' options={this.getStates()} onChange={this.handleChange} />
                  </Form.Group> */}
                  
                  <Button type='submit' color='blue'>Submit</Button>
               </Form>
            </Grid.Column>
         </Grid>
      )
   }
}

export default SignUp


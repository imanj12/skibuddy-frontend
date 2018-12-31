import React, {Component} from 'react'
import {Form, Button, Grid, Header} from 'semantic-ui-react'

class SignUp extends Component {
   state = {
      username: '',
      password: '',
      rePassword: '',
      address: '',
      city: '',
      state: ''
   }

   handleChange = (event, data) => {
      this.setState({ [data.name]: data.value })
   }

   handleSubmit = (event) => {
      event.preventDefault()
      this.postUser()
   }

   postUser = () => {
      let data = { user: {
         username: this.state.username,
         password: this.state.password,
         password_confirmation: this.state.password,
         address: this.state.address,
         city: this.state.city,
         state: this.state.state
      }}

      console.log(data)
      
      let url = 'http://localhost:3000/users'
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
            if (data.errors) {
               
            }
         })
   }

   getStates = () => { // maybe store this function in App since it's used twice
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

   render() {
      return (
         <Grid textAlign='center' verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
               <Header as='h2' color='blue' textAlign='center'>
               {/* <Image src='/logo.png' />  */}
               Create an account
               </Header>
               <Form onSubmit={this.handleSubmit} >
                  <Form.Input required name='username' label='Username' placeholder='Username' onChange={this.handleChange} />
                  <Form.Group widths='equal'>
                     <Form.Input required name='password' label='Password' placeholder='Password' type='password' onChange={this.handleChange} />
                     <Form.Input required name='rePassword' label='Re-enter Password' placeholder='Password' type='password' onChange={this.handleChange} />
                  </Form.Group>
                  <Form.Input name='address' label='Street' placeholder='Street Address' onChange={this.handleChange} />
                  <Form.Group widths='equal'>
                     <Form.Input required name='city' label ='City' placeholder='City' onChange={this.handleChange} />
                     <Form.Select required search name='state' label='State' value={this.state.state} placeholder='Select one' options={this.getStates()} onChange={this.handleChange} />
                  </Form.Group>
                  <Button type='submit' color='blue'>Submit</Button>
               </Form>
            </Grid.Column>
         </Grid>
      )
   }
}

export default SignUp


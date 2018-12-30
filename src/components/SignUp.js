import React, {Component} from 'react'
import {Form, Button, Grid, Header} from 'semantic-ui-react'

class SignUp extends Component {
   state = {

   }

   handleChange = (event, data) => {
      this.setState({ [data.name]: data.value })
   }

   handleSubmit = (event) => {
      event.preventDefault()
      this.postUser()
   }

   getStates = () => { // store this function in App since it's used twice
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
               <Form>
                  <Form.Input required label='Username' placeholder='Username'/>
                  <Form.Group widths='equal'>
                     <Form.Input required name='password' label='Password' placeholder='Password' type='password'/>
                     <Form.Input required name='re-password' label='Re-enter Password' placeholder='Password' type='password'/>
                  </Form.Group>
                  <Form.Input label='Street' placeholder='Street Address' />
                  <Form.Group widths='equal'>
                     <Form.Input required label ='City' placeholder='City'/>
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


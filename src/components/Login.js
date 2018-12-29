import React, { Component } from 'react'
import {Grid, Header, Form, Image, Button, Segment, Message} from 'semantic-ui-react'

class Login extends Component {
   state = {
      username: '',
      password: ''
   }

   render() {
      return (
         <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='blue' textAlign='center'>
               <Image src='/logo.png' /> Log-in to your account
            </Header>
            <Form size='large' onSubmit={this.props.handleLoginSubmit}>
               <Segment stacked>
                  <Form.Input name='username' fluid icon='user' iconPosition='left' placeholder='Username' />
                  <Form.Input
                  name='password'
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                  />

                  <Button color='blue' fluid size='large' type='submit'>
                  Login
                  </Button>
               </Segment>
            </Form>
            <Message>
               New to us? <a href='#'>Sign Up</a>
            </Message>
            </Grid.Column>
         </Grid>
      )
   }
}

export default Login

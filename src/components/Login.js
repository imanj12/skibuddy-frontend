import React, { Component } from 'react'
import {Grid, Header, Form, Image, Button, Segment, Message} from 'semantic-ui-react'
import {Redirect, Link} from 'react-router-dom'
const Cookies = require('cookies-js')

class Login extends Component {

   userLogin = (username, password) => {
      const url = 'http://localhost:3000/login'
      let data = { user: { username: username, password: password } }
      fetch(url, {
        method: 'POST',
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify(data)
      })
        .then(r => r.json())
        .then(data => {
          if (data.error) {
            alert(data.message)
          } else {
            Cookies.set('token', data.jwt)
            this.props.setUser(data.user)
          }
        })
    }

    handleLoginSubmit = (event) => {
      const username = event.target.username.value
      const password = event.target.password.value
      this.userLogin(username, password)
    }

   render() {
      return Cookies.get('token') ? <Redirect to='/home' /> : (
        <Grid textAlign='center' verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='blue' textAlign='center'>
            {/* <Image src='/logo.png' />  */}
            Log-in to your account
          </Header>
          <Form size='large' onSubmit={this.handleLoginSubmit}>
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
              New to us? <Link to='/signup'>Sign up</Link>
          </Message>
          </Grid.Column>
        </Grid>
      )
   }
}

export default Login

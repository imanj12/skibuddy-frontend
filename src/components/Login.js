import React, { Component } from 'react'
import {Grid, Header, Form, Button, Segment, Message} from 'semantic-ui-react'
import {Redirect, Link} from 'react-router-dom'
const Cookies = require('cookies-js')

class Login extends Component {

  componentDidMount() {
    document.body.style.backgroundImage = "url('https://cdn.powder.com/uploads/2017/12/AiguileDeLAmone_HeliSki_%C2%A9www.jeremy-bernard.com-3245.jpg')"  
  }

  componentWillUnmount() {
    document.body.style.backgroundImage = ""
  }

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
        <div className='padded-top-large ski-background'>
        <Grid textAlign='center' verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
          <Segment>
            <Header as='h2' color='blue' textAlign='center'>
              {/* <Image src='/logo.png' />  */}
              Welcome to SkiBuddy!
            </Header>
          </Segment>
          <Form size='large' onSubmit={this.handleLoginSubmit}>
              <Segment stacked>
                <Message content="Hint: Sign in with username 'test' and password 'test' to demo the app with pre-populated ski mountains. Or, create an account below."/>
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
        </div>
      )
   }
}

export default Login

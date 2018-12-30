import React, {Component} from 'react'
import {Form, Header, Button, Grid} from 'semantic-ui-react'
import {withRouter} from 'react-router-dom'
const Cookies = require('cookies-js')

class NewEditRegion extends Component {
   state = {
      name: ''
   }

   handleChange = (event, data) => {
      this.setState({ [data.name]: data.value })
   }

   handleSubmit = (event) => {
      event.preventDefault()
      const data = {
         name: this.state.name,
         user_id: this.props.userId
      }
      const url = 'http://localhost:3000/regions'
      const token = Cookies.get('token')
      fetch(url, {
         method: 'POST',
         headers: {
            "Content-Type":"application/json",
            "Authorization": `Bearer ${token}`
         },
         body: JSON.stringify(data)
      })
         .then(() => this.props.userFetch())
         .then(() => this.props.history.push('/regions'))
   }

   render() {
      return (
         <Grid columns={1} stackable centered>
            <Grid.Row>
               <Form onSubmit={this.handleSubmit}>
                  <Header as='h3' content='Create a Region' />
                  <Form.Input name='name' value={this.state.name} label='Region Name' placeholder='e.g. Denver Area' onChange={this.handleChange}/>
                  <Button color='blue' type='submit'>Submit</Button>
               </Form> 
            </Grid.Row>  
         </Grid>   
      )
   }
}

export default withRouter(NewEditRegion)


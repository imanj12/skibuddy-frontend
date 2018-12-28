import React, {Component} from 'react'
import {Form, Header, Button} from 'semantic-ui-react'
import {withRouter} from 'react-router-dom'

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
      fetch(url, {
         method: 'POST',
         headers: {
            "Content-Type":"application/json"
         },
         body: JSON.stringify(data)
      })
         .then(() => this.props.userFetch())
         .then(() => this.props.history.push('/regions'))
   }

   render() {
      return (
         <Form onSubmit={this.handleSubmit}>
            <Header as='h3' content='Create a Region' />
            <Form.Input name='name' value={this.state.name} label='Region Name' placeholder='e.g. Denver Area' onChange={this.handleChange}/>
            <Button color='blue' type='submit'>Submit</Button>
         </Form>      
      )
   }
}

export default withRouter(NewEditRegion)


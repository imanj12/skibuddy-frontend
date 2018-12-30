import React, {Component} from 'react'
import {Form, Header, Button, Grid} from 'semantic-ui-react'
import {withRouter} from 'react-router-dom'
const Cookies = require('cookies-js')

class NewEditRegion extends Component {
   constructor(props) {
      super(props)
      if (this.props.region) {
         this.state = {
            name: this.props.region.name
         }
      } else {
         this.state = {
            name: ''
         }
      }
   }

   handleChange = (event, data) => {
      this.setState({ [data.name]: data.value })
   }

   postPatchRegion = () => {   
      const data = {
         name: this.state.name,
         user_id: this.props.userId
      }
      let url = 'http://localhost:3000/regions'
      let method = 'POST'

      if (this.props.region) {
         url += `/${this.props.region.id}`
         method = 'PATCH'
      }
      console.log(url)
      const token = Cookies.get('token')
      fetch(url, {
         method: method,
         headers: {
            "Content-Type":"application/json",
            "Authorization": `Bearer ${token}`
         },
         body: JSON.stringify(data)
      })
         .then(() => this.props.userFetch())
         .then(() => this.props.history.push('/regions'))
   }

   handleSubmit = (event) => {
      event.preventDefault()
      this.postPatchRegion()
   }

   render() {
      return (
         <Grid columns={1} stackable centered>
            <Grid.Row>
               <Form onSubmit={this.handleSubmit}>
                  <Header as='h3' content={this.props.region ? this.props.region.name : 'Create a Region'} />
                  <Form.Input 
                     name='name' 
                     value={this.state.name} 
                     label={this.props.region ? 'Edit Name' : 'Region Name'} 
                     placeholder='e.g. Denver Area'
                     onChange={this.handleChange}/>
                  <Button color='blue' type='submit'>Submit</Button>
               </Form> 
            </Grid.Row>  
         </Grid>   
      )
   }
}

export default withRouter(NewEditRegion)


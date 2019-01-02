import React, {Component} from 'react'
import {Form, Header, Button, Grid} from 'semantic-ui-react'
import {withRouter} from 'react-router-dom'
const Cookies = require('cookies-js')

class NewEdit extends Component {
   constructor(props) {
      super(props)
      if (this.props.mountain) {
         this.state = {
            name: this.props.mountain.name,
            city: this.props.mountain.city,
            state: this.props.mountain.state,
            trailmap: this.props.mountain.trailmap,
            url: this.props.mountain.url,
            region_id: this.props.mountain.region_id
         }
      } else {
         this.state = {
            name: '',
            city: '',
            state: '',
            trailmap: '',
            url: '',
            region_id: null
         }
      }
   }
   
   // populate select box options with all 50 states in right format
   // [{ key: 'af', value: 'af', text: 'Afghanistan' }, ...{}]
   getStates = () => {
      let usaStates = require('usa-states').UsaStates
      let usStates = new usaStates().states
      let states = []
      for (let i=0; i<usStates.length; i++) {
         states.push({ key: usStates[i].abbreviation, value: usStates[i].abbreviation, text: usStates[i].name})
      }
      return states
   }
   
   // populate select box options with available user-created regions in right format
   // [{ key: 'af', value: 'af', text: 'Afghanistan' }, ...{}]
   getRegions = () => {
      let userRegions = this.props.regions
      let regions = []
      regions.push({ key: 0, value: 0, text: 'None' })
      for (let i=0;i<userRegions.length;i++) {
         regions.push({ key: userRegions[i].id, value: userRegions[i].id, text: userRegions[i].name })
      }
      return regions
   }

   handleChange = (event, data) => {
      this.setState({ [data.name]: data.value })
   }

   postMountain = () => {
      let data = {
         name: this.state.name,
         city: this.state.city,
         state: this.state.state,
         trailmap: this.state.trailmap,
         url: this.state.url,
         user_id: this.props.userId,
         region_id: this.state.region_id
      }
      
      console.log(data)
      console.log(this.state.region_id)

      if (this.state.region_id === 0) {
         data.region_id = null
      }

      let url = 'http://localhost:3000/mountains'
      let method = 'POST'

      if (this.props.mountain) {
         url += `/${this.props.mountain.id}`
         method = 'PUT'
      }
      console.log(data)
      const token = Cookies.get('token')
      fetch(url, {
         method: method,
         headers: {
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
         },
         body: JSON.stringify(data)
      })
      .then(() => this.props.userFetch())
      // .then(() => this.props.history.push('/')) ADD THIS BACKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK
   }

   handleSubmit = (event) => {
      // event.preventDefault()
      this.postMountain()
   }

   render() {
      return (
         <div className='padded-top-small'>
            <Grid columns={1} stackable centered>
               <Grid.Row>
                  <Form onSubmit={this.handleSubmit}>
                     <Header as='h2' content={this.props.mountain ? `Edit ${this.props.mountain.name}` : 'Create a mountain'}/>
                     <Form.Input required name='name' value={this.state.name} label='Resort Name' placeholder='e.g. Heavenly' onChange={this.handleChange} />
                     <Form.Group>
                        <Form.Input required name='city' value={this.state.city} label='City' placeholder='e.g. South Lake Tahoe' onChange={this.handleChange} />
                        <Form.Select required search name='state' label='State' value={this.state.state} placeholder='Select one' options={this.getStates()} onChange={this.handleChange} />
                     </Form.Group>
                     <Form.Input name='trailmap' value={this.state.trailmap} label='Trailmap URL' placeholder='Must be of .jpg file type' onChange={this.handleChange}/>
                     <Form.Input name='url' value={this.state.url} label='Resort URL' placeholder='This is just a convenience...' onChange={this.handleChange}/>
                     
                     <Header as='h2' content='Attach to a Region (optional)'/>
                     <Header as='h3' content='Pick existing region'/>
                     <Form.Select search name='region_id' value={this.state.region_id} label='Region Name' options={this.props.regions ? this.getRegions() : null} onChange={this.handleChange}/>
                     <Button color='blue' type='submit'>Submit</Button>
                  </Form>
               </Grid.Row>
            </Grid>
         </div>
      )
   }
}

export default withRouter(NewEdit)

import React, {Component} from 'react'
import {Form, Header, Button, Grid} from 'semantic-ui-react'
import {withRouter} from 'react-router-dom'

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
            region_id: this.props.mountain.region_id,
            user_id: this.props.mountain.user_id,
            regions: []
         }
      } else {
         this.state = {
            name: '',
            city: '',
            state: '',
            trailmap: '',
            url: '',
            region_id: null,
            user_id: '',
            regions: []
         }
      }
   }
   
   

   // populate select box options in right format
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
   
   // populate select box options in right format
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
         user_id: this.props.userId
      }
      if (this.state.region_id !== null || this.state.region_id !== 0) {
         data.region_id = this.state.region_id
      }
      
      let url = 'http://localhost:3000/mountains'
      let method = 'POST'

      if (this.props.mountain) {
         url = `http://localhost:3000/mountains/${this.props.mountain.id}`
         method = 'PUT'
      }

      fetch(url, {
         method: method,
         headers: {
            "Content-Type":"application/json"
         },
         body: JSON.stringify(data)
      })
      .then(() => this.props.userFetch())
      .then(() => this.props.history.push('/'))

   }

   handleSubmit = (event) => {
      event.preventDefault()
      this.postMountain()
   }

   render() {
      return (
         <Grid columns={1} stackable centered>
            <Grid.Row>
               <Form onSubmit={this.handleSubmit}>
                  <Header as='h2' content={this.props.mountain ? `Edit ${this.props.mountain.name}` : 'Create a mountain'}/>
                  <Form.Input required name='name' value={this.state.name} label='Resort Name' placeholder='e.g. Heavenly' onChange={this.handleChange} />
                  <Form.Group>
                     <Form.Input required name='city' value={this.state.city} label='City' placeholder='e.g. South Lake Tahoe' onChange={this.handleChange} />
                     <Form.Select required search name='state' label='State' value={this.state.state} placeholder='e.g. CA' options={this.getStates()} onChange={this.handleChange} />
                  </Form.Group>
                  <Form.Input name='trailmap' value={this.state.trailmap} label='Trailmap URL' placeholder='Must be of .jpg file type' onChange={this.handleChange}/>
                  <Form.Input name='url' value={this.state.url} label='Resort URL' placeholder='This is just a convenience...' onChange={this.handleChange}/>
                  
                  <Header as='h2' content='Attach to a Region (optional)'/>
                  <Header as='h3' content='Pick existing region'/>
                  <Form.Select search name='region_id' value={this.state.region_id || 0} label='Region Name' options={this.props.regions ? this.getRegions() : null} onChange={this.handleChange}/>
                  <Button color='blue' type='submit'>Submit</Button>
               </Form>
            </Grid.Row>
         </Grid>
      )
   }
}

export default withRouter(NewEdit)

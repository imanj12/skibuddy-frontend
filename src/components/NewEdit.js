import React, {Component} from 'react'
import {Form, Header, Button, Grid, Container, Message} from 'semantic-ui-react'
import {withRouter} from 'react-router-dom'
import {URL} from '../constants/constants'
const Capitalize = require('lodash/capitalize')
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
            region_id: this.props.mountain.region_id,
            errors: null
         }
      } else {
         this.state = {
            name: '',
            city: '',
            state: '',
            trailmap: '',
            url: '',
            region_id: null,
            errors: null
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
      
      // console.log(data)
      // console.log(this.state.region_id)

      if (this.state.region_id === 0) {
         data.region_id = null
      }

      let url = URL + '/mountains'
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
      .then(r => r.json())
      .then(data => {
         console.log(data)
         if (data.errors) {
            this.setState({ errors: data.errors })
         } else {
            this.props.userFetch()
            if (method === 'PUT') {
               this.props.history.push(`/mountains/${data.id}`)
            } else {
               this.props.history.push('/')
            }
         }
      })
      // .then(() => this.props.userFetch())
      // .then(() => this.props.history.push('/'))
   }

   handleSubmit = (event) => {
      // event.preventDefault()
      this.postMountain()
   }

   mapErrors = () => {
      const keys = Object.keys(this.state.errors)
      return keys.map(key => {
         let field = Capitalize(key)
         field = field.replace('-', ' ')
         let message = this.state.errors[key]
         return `${field} ${message}`
      })
   }

   render() {
      return (
         <div className='padded-top-small'>
            <Grid columns={1} stackable centered>
               <Container text>
                  <Form onSubmit={this.handleSubmit} widths='equal'>
                     <Header as='h1' content={this.props.mountain ? `Edit ${this.props.mountain.name}` : 'Create a mountain'}/>
                     
                     <Message size='small'>
                        <Message.Header>Hint</Message.Header>
                        <Message.Content>
                        <p>Weather conditions and the interactive trail map rely on querying external APIs and, as such, require inputing accurate information below. If you're uncertain, please double check the resort name, city and state by first searching <a href='http://maps.google.com' target='_blank' rel="noopener noreferrer">Google Maps.</a></p>

                        <p>You can add this mountain to an exisiting region now, or create a new region after this step with the "new Region" button and create the association on that page.</p>
                        </Message.Content>
                     </Message>

                     {this.state.errors ? (
                        <Message 
                           negative
                           header='Error'
                           content='Name has already been taken'
                        />
                     ) : null}
                     
                     <Form.Input required name='name' value={this.state.name} label='Resort Name' placeholder='e.g. Heavenly' onChange={this.handleChange} />
                     
                     <Form.Group>
                        <Form.Input required name='city' value={this.state.city} label='City' placeholder='e.g. South Lake Tahoe' onChange={this.handleChange} />
                        <Form.Select required search name='state' label='State' value={this.state.state} placeholder='Select one' options={this.getStates()} onChange={this.handleChange} />
                     </Form.Group>
                     
                     {/* <Form.Input name='trailmap' value={this.state.trailmap} label='Trailmap URL' placeholder='Must be of .jpg file type' onChange={this.handleChange}/> */}
                     
                     {/* <Form.Input name='url' value={this.state.url} label='Resort URL' placeholder='This is just a convenience...' onChange={this.handleChange}/> */}
                     
                     <Header as='h2' content='Attach to a Region (optional)'/>
                     
                     <Form.Select search name='region_id' value={this.state.region_id} label='Pick a region' options={this.props.regions ? this.getRegions() : null} onChange={this.handleChange}/>
                     
                     <Button color='blue' type='submit'>Submit</Button>
                  </Form>
               </Container>
            </Grid>
         </div>
      )
   }
}

export default withRouter(NewEdit)

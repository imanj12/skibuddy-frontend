import React, {Component, Fragment} from 'react'
import {Form, Header, Button, Icon} from 'semantic-ui-react'

class NewEdit extends Component {
   constructor(props) {
      super(props)
      this.state = {
         name: '',
         city: '',
         state: '',
         trailmap: '',
         url: '',
         region_id: 0,
         user_id: '',
         regions: []
      }
   }

   componentDidMount() {
      
   }

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

      if (this.state.region_id !== 0) {
         data.region_id = this.state.region_id
      }

      let url = 'http://localhost:3000/mountains'
      fetch(url, {
         method: 'POST',
         headers: {
            "Content-Type":"application/json"
         },
         body: JSON.stringify(data)
      })
   }

   handleNewRegion = (event, data) => {
      console.log('test')
   }

   handleSubmit = (event) => {
      event.preventDefault()
      // if (this.state.region_name !== '') {
      //    let regionData = {name: this.state.region_name}
      //    let regionUrl = 'http://localhost:3000/regions'
      //    fetch(regionUrl, {
      //       method: 'POST',
      //       headers: {
      //          "Content-Type":"application/json"
      //       },
      //       body: JSON.stringify(regionData)
      //    })
      //       .then(() => {

      //       })
      // }
      this.postMountain()
   }

   render() {
      return (
         <Fragment>
            <Form onSubmit={this.handleSubmit}>
               <Header as='h2' content='Create/edit a mountain'/>
               <Form.Input required name='name' value={this.state.name} label='Resort Name' placeholder='e.g. Heavenly' onChange={this.handleChange} />
               <Form.Group>
                  <Form.Input required name='city' value={this.state.city} label='City' placeholder='e.g. South Lake Tahoe' onChange={this.handleChange} />
                  <Form.Select required search name='state' label='State' value={this.state.state} placeholder='e.g. CA' options={this.getStates()} onChange={this.handleChange} />
               </Form.Group>
               <Form.Input name='trailmap' value={this.state.trailmap} label='Trailmap URL' placeholder='Must be of .jpg file type' onChange={this.handleChange}/>
               <Form.Input name='url' value={this.state.url} label='Resort URL' placeholder='This is just a convenience...' onChange={this.handleChange}/>
               
               <Header as='h2' content='Attach to a Region (optional)'/>
               <Header as='h3' content='Pick existing region'/>
               <Form.Select search name='region_id' value={this.state.region_id} label='Region Name' options={this.props.regions ? this.getRegions() : null} onChange={this.handleChange}/>
               <Button color='blue' type='submit'>Submit</Button>
            </Form>
         </Fragment>
      )
   }
}

export default NewEdit

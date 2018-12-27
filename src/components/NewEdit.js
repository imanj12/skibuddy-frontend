import React, {Component, Fragment} from 'react'
import {Form, Header, Button} from 'semantic-ui-react'

class NewEdit extends Component {
   constructor(props) {
      super(props)
      this.state = {
         name: '',
         city: '',
         state: '',
         trailmap: '',
         url: '',
         region_id: '',
         user_id: '',
         region_name: ''
      }
   }

   getStates = () => {
      // [{ key: 'af', value: 'af', flag: 'af', text: 'Afghanistan' }, ...{}]
      let usaStates = require('usa-states').UsaStates
      let usStates = new usaStates().states
      let states = []
      for (let i=0; i<usStates.length; i++) {
         states.push({ key: usStates[i].abbreviation, value: usStates[i].abbreviation, text: usStates[i].name})
      }
      console.log(states)
      return states
   }

   getRegions = () => {
      let userRegions = this.props.regions
      let regions = []
      for (let i=0;i<userRegions.length;i++) {
         regions.push({ key: userRegions[i].id, value: userRegions[i].id, text: userRegions[i].name })
      }
      console.log(regions)
      return regions
   }

   handleChange = (event) => {
      const value = event.target.value
      const name = event.target.name
      this.setState({ [name]: value })
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

      if (this.state.region_id !== '') {
         data.region_id = this.state.region_id
      }

      let url = 'http://localhost:3000/mountains'
      fetch(url, {
         type: 'POST',
         headers: {
            "Content-Type":"application/json"
         },
         body: JSON.stringify(data)
      })
   }

   handleSubmit = (event) => {
      event.preventDefault()
      // if (this.state.region_name !== '') {
      //    let regionData = {name: this.state.region_name}
      //    let regionUrl = 'http://localhost:3000/regions'
      //    fetch(regionUrl, {
      //       type: 'POST',
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
            <Form onSubmit={this.onSubmit}>
               <Header as='h2' content='Create/edit a mountain'/>
               <Form.Input required name='name' value={this.state.name} label='Resort Name' placeholder='e.g. Heavenly' onChange={this.handleChange} />
               <Form.Group>
                  <Form.Input required name='city' value={this.state.city} label='City' placeholder='e.g. South Lake Tahoe' onChange={this.handleChange} />
                  <Form.Select required search name='state' value={this.state.state} label='State' placeholder='e.g. CA' options={this.getStates()} onChange={this.handleChange} />
               </Form.Group>
               <Form.Input name='trailmap' value={this.state.trailmap} label='Trailmap URL' placeholder='Must be of .jpg file type' onChange={this.handleChange}/>
               <Form.Input name='url' value={this.state.url} label='Resort URL' placeholder='This is just a convenience...' onChange={this.handleChange}/>
               
               <Header as='h2' content='Attach to a Region (optional)'/>
               <Header as='h3' content='Pick existing region'/>
               <Form.Select search name='region_id' value={this.state.region_id} label='Region Name' options={this.props.regions ? this.getRegions() : null} onChange={this.handleChange}/>
               <Header as='h3' content='Or create a new one' />
               <Form.Input name='region_name' value={this.state.region_name} label='Region Name' placeholder='e.g. Denver Area' onChange={this.handleChange}/>
               <Button color='blue' type='submit'>Submit</Button>
            </Form>
         </Fragment>
      )
   }
}

export default NewEdit

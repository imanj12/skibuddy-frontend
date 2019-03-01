import React, {Component, Fragment} from 'react'
import {Form, Header, Button, Grid, Dropdown} from 'semantic-ui-react'
import {withRouter} from 'react-router-dom'
import {URL} from '../constants/constants'
const Cookies = require('cookies-js')

class NewEditRegion extends Component {
   constructor(props) {
      super(props)
      // if this component rendered as a result of clicking Edit Region, then populate forms with existing information, else forms are blank for new region
      if (this.props.region) {
         this.state = {
            name: this.props.region.name,
            mtns: []
         }
      } else {
         this.state = {
            name: '',
            mtns: []
         }
      }
   }

   handleChange = (event, data) => {
      this.setState({ [data.name]: data.value })
   }

   // use form data from state to create or edit region in backend
   postPatchRegion = () => {   
      const data = {
         name: this.state.name,
         user_id: this.props.userId
      }
      let url = URL + '/regions'
      let method = 'POST'

      // check if region props exist, meaning this is an edit form, therefore switch method to patch
      if (this.props.region) {
         url += `/${this.props.region.id}`
         method = 'PATCH'
      }
      
      const token = Cookies.get('token')
      fetch(url, {
         method: method,
         headers: {
            "Content-Type":"application/json",
            "Authorization": `Bearer ${token}`
         },
         body: JSON.stringify(data)
      })
         .then(r => r.json())
         .then(data => this.updateMtns(data.id))
         .then(() => this.props.userFetch())
         .then(() => this.props.history.push('/regions'))
   }

   // create array to populate mountains dropdown
   mtnOptions = () => {
      let mtnOptions = []
      // let mtns = this.props.allMtns.filter(mtn => mtn.region_id == null)
      let mtns = this.props.allMtns.filter(mtn => mtn.region == null)
      for (let i=0;i<mtns.length;i++) {
         mtnOptions.push({ key: mtns[i].id, value: mtns[i].id, text: mtns[i].name })
      }
      return mtnOptions
   }
   
   // if mountains are added to region, then update those mountains in backend to create region association
   updateMtns = (regionId) => {
      if (this.state.mtns.length > 0) {
         let mtns = this.state.mtns
         const token = Cookies.get('token')
         for(let i=0;i<mtns.length;i++) {
            let data = { region_id: regionId }
            const url = URL + `/mountains/${mtns[i]}`
            fetch(url, {
               method: 'PATCH',
               headers: {
                  "Content-Type":"application/json",
                  Authorization: `Bearer ${token}`
               },
               body: JSON.stringify(data)
            })
            .then(() => this.props.userFetch())
         }
      }
   }

   handleSubmit = (event, data) => {
      event.preventDefault()
      this.postPatchRegion()
   }

   render() {
      return (
         <div className='padded-top-small'>
            <Grid columns={1} stackable centered>
               <Grid.Row>
                  <Form onSubmit={this.handleSubmit}>
                     <Header as='h1' content={this.props.region ? this.props.region.name : 'Create a Region'} />
                     <Form.Input 
                        name='name' 
                        value={this.state.name} 
                        label={this.props.region ? 'Edit Name' : 'Region Name'} 
                        placeholder='e.g. Denver Area'
                        onChange={this.handleChange}
                     />
                     <Fragment>
                        <Header as='h4' content='Assign free mountain(s) to region' />
                        <Dropdown fluid multiple search selection
                           name='mtns'
                           options={this.mtnOptions()}
                           placeholder={this.mtnOptions().length < 1 ? 'All mountains assigned' : 'Select...'}
                           onChange={this.handleChange}
                        />
                     </Fragment>
                     <Button color='blue' type='submit'>Submit</Button>
                  </Form> 
               </Grid.Row>
            </Grid>  
         </div> 
      )
   }
}

export default withRouter(NewEditRegion)


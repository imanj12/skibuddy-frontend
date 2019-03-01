import React, {Component} from 'react'
import MountainCard from '../components/MountainCard'
import {Segment, Grid, Header, Button, Icon} from 'semantic-ui-react'
import {withRouter, Link} from 'react-router-dom'
import mountains from '../style/icons/noun_Mountains_1579651.png'
import {URL} from '../constants/constants'
const Cookies = require('cookies-js')

class MountainContainer extends Component {

   // when a region is deleted, remove the association between it and the mountains from the backend
   unassignMtns = () => {
      let mtns = this.props.mountains
      const token = Cookies.get('token')
      console.log(mtns)
      for(let i=0;i<mtns.length;i++) {
         let data = { region_id: null }
         console.log(mtns[i])
         const url = URL + `/mountains/${mtns[i].id}`
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
   
   // delete a region
   deleteRegion = (event) => {
      const url = URL + `/regions/${this.props.region.id}`
      const token = Cookies.get('token')
      fetch(url, {
         method: 'DELETE',
         headers: {
            "Content-Type":"application/json",
            "Authorization": `Bearer ${token}`
         }
      })
      .then(() => this.unassignMtns())
      .then(() => this.props.history.push('/'))
   }

   render() {
      return (
         <div className='padded-top-small'>
            <Grid columns={5} stackable centered>
               <Header as='h2'>
                  <img alt='' src={mountains}></img>
                  <Header.Content>{this.props.region ? this.props.region.name : 'All Mountains'}</Header.Content>
                  <img alt='' src={mountains}></img>
               </Header>
               <Grid.Row>
                  {this.props.mountains.map((mtn, i) => (
                     <Grid.Column key={i}>
                        <Segment basic >
                           <MountainCard mountain={mtn} />
                        </Segment>
                     </Grid.Column>
                  ))}
               </Grid.Row>
               {this.props.region ? (
                  <Grid.Row>
                     <Grid.Column>
                        <Segment basic textAlign='center'>
                           <Button fluid content='Edit' color='blue' as={Link} to={`/regions/${this.props.region.id}/edit`}/>
                        </Segment>
                     </Grid.Column>
                     <Grid.Column>
                        <Segment basic textAlign='center'>
                           <Button fluid color='red' content='Delete' onClick={this.deleteRegion}/>
                        </Segment>
                     </Grid.Column>
                  </Grid.Row>
               ) : null}
            </Grid>
         </div>
      )
   }
}

export default withRouter(MountainContainer)

// setMountain={props.setMountain} 

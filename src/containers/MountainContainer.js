import React, {Component} from 'react'
import MountainCard from '../components/MountainCard'
import {Segment, Grid, Header, Button} from 'semantic-ui-react'
import {withRouter, Link} from 'react-router-dom'
const Cookies = require('cookies-js')

class MountainContainer extends Component {

   deleteRegion = (event) => {
      const url = `http://localhost:3000/regions/${this.props.region.id}`
      const token = Cookies.get('token')
      fetch(url, {
         method: 'DELETE',
         headers: {
            "Content-Type":"application/json",
            "Authorization": `Bearer ${token}`
         }
      })
      .then(() => this.props.userFetch())
      .then(() => this.props.history.push('/'))
   }

   render() {
      return (
         <Grid columns={5} stackable centered>
            <Header as='h2' content={this.props.region ? this.props.region.name : 'All Mountains'}/>
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
      )
   }
}

export default withRouter(MountainContainer)

// setMountain={props.setMountain} 

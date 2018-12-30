import React from 'react'
import MountainCard from '../components/MountainCard'
import {Segment, Grid} from 'semantic-ui-react'


const MountainContainer = (props) => {
   return (
      <Grid columns={5} stackable centered>
         <Grid.Row>
            {props.mountains.map((mtn, i) => (
               <Grid.Column key={i}>
                  <Segment basic >
                     <MountainCard mountain={mtn} />
                  </Segment>
               </Grid.Column>
            ))}
         </Grid.Row>
      </Grid>
   )
}

export default MountainContainer

// setMountain={props.setMountain} 

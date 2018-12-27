import React from 'react'
import MountainCard from '../components/MountainCard'
import {Segment, Grid} from 'semantic-ui-react'


const MountainContainer = (props) => {
   return (
      props.mountains ? props.mountains.map((mtn, i) => <Grid.Column key={i}><Segment basic ><MountainCard mountain={mtn} /></Segment></Grid.Column>) : null
   )
}

export default MountainContainer

// setMountain={props.setMountain} 

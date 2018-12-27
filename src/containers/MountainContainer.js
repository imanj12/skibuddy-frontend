import React from 'react'
import MountainCard from '../components/MountainCard'
import {Segment, Grid} from 'semantic-ui-react'


const MountainContainer = (props) => {
   return (
      props.mountains ? props.mountains.map((mtn, i) => <Grid.Column><Segment basic key={i}><MountainCard key={i} mountain={mtn} setMountain={props.setMountain} /></Segment></Grid.Column>) : null
   )
}

export default MountainContainer

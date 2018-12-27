import React from 'react'
import MountainCard from '../components/MountainCard'
import {Segment} from 'semantic-ui-react'


const MountainContainer = (props) => {
   return (
      props.mountains ? props.mountains.map((mtn, i) => <Segment basic key={i}><MountainCard key={i} mountain={mtn} setMountain={props.setMountain} /></Segment>) : null
   )
}

export default MountainContainer

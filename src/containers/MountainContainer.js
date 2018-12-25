import React from 'react'
import MountainCard from '../components/MountainCard'

const MountainContainer = (props) => {
   return (
      props.mountains ? props.mountains.map((mtn, i) => <MountainCard key={i} mountain={mtn} />) : null
   )
}

export default MountainContainer

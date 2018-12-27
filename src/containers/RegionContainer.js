import React from 'react'
import RegionCard from '../components/RegionCard'
import {Segment, Grid} from 'semantic-ui-react'

const RegionContainer = (props) => {
   return (
      props.regions ? props.regions.map((region, i) => <Grid.Column><Segment basic key={i}><RegionCard key={i} region={region} /></Segment></Grid.Column>) : null
   )
}

export default RegionContainer

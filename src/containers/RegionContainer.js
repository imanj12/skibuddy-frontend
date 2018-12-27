import React from 'react'
import RegionCard from '../components/RegionCard'
import {Segment} from 'semantic-ui-react'

const RegionContainer = (props) => {
   return (
      props.regions ? props.regions.map((region, i) => <Segment basic key={i}><RegionCard key={i} region={region} /></Segment>) : null
   )
}

export default RegionContainer

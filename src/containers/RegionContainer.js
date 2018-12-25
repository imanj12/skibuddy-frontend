import React from 'react'
import RegionCard from '../components/RegionCard'

const RegionContainer = (props) => {
   return (
      props.regions ? props.regions.map((region, i) => <RegionCard key={i} region={region} />) : null
   )
}

export default RegionContainer

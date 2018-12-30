import React from 'react'
import RegionCard from '../components/RegionCard'
import {Segment, Grid, Header} from 'semantic-ui-react'

const RegionContainer = (props) => {
   return (
      <Grid columns={5} stackable centered>
         <Header as='h2' content='Regions'/>
         <Grid.Row>
            {props.regions.map((region, i) => (
               <Grid.Column key={i}>
                  <Segment basic>
                     <RegionCard region={region} />
                  </Segment>
               </Grid.Column>
            ))}
         </Grid.Row>
      </Grid>
   )
}

export default RegionContainer

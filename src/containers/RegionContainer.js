import React from 'react'
import RegionCard from '../components/RegionCard'
import {Segment, Grid, Header} from 'semantic-ui-react'
import regions from '../style/icons/noun_Earth_965892.png'

const RegionContainer = (props) => {
   return (
      <div className='padded-top-small'>
         <Grid columns={5} stackable centered>
            <Header as='h2'>
               <img alt='' src={regions}></img><br/>
               <Header.Content>Regions</Header.Content>
            </Header>
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
      </div>
   )
}

export default RegionContainer

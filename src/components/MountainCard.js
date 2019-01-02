import React, {Fragment} from 'react'
import { Card, Image } from 'semantic-ui-react'
import {Link} from 'react-router-dom'

const MountainCard = (props) => {
   const { mountain } = props
   return (
      <Fragment>
         <Card className ='textalign-center' as={Link} to={`/mountains/${mountain.id}`} color ='teal'>
            <Image src='https://www.worldatlas.com/r/w728-h425-c728x425/upload/44/5d/77/shutterstock-519106648.jpg' />
            <Card.Content>
               <Card.Header>{mountain.name}</Card.Header>
               <Card.Meta>
                  <span className='date'>{mountain.city}, {mountain.state}</span>
               </Card.Meta>
               {/* <Card.Description>Description here</Card.Description> */}
            </Card.Content>
            {/* <Card.Content extra>
               <Icon name='world' />
               Some Text
            </Card.Content> */}
         </Card>
      </Fragment>
   )
}

export default MountainCard

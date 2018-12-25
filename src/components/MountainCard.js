import React, {Fragment} from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'

const MountainCard = (props) => {
   return (
      <Fragment>
				<Card>
					<Image src='https://www.worldatlas.com/r/w728-h425-c728x425/upload/44/5d/77/shutterstock-519106648.jpg' />
					<Card.Content>
						<Card.Header>{props.mountain.name}</Card.Header>
						<Card.Meta>
							<span className='date'>Average snowfall</span>
						</Card.Meta>
						<Card.Description>Description here</Card.Description>
					</Card.Content>
					<Card.Content extra>
						<a>
							<Icon name='world' />
							Some Text
						</a>
					</Card.Content>
				</Card>
	 		</Fragment>
   )
}

export default MountainCard

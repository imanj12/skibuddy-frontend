import React, {Fragment} from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'
import {Link} from 'react-router-dom'

const RegionCard = (props) => {
	const { region } = props
	return (
		<Fragment>
			<Card className='textalign-center' as={Link} to={`/regions/${region.id}`} color='blue'>
				<Image src='https://www.worldatlas.com/r/w728-h425-c728x425/upload/44/5d/77/shutterstock-519106648.jpg' />
				<Card.Content>
					<Card.Header>{region.name}</Card.Header>
					{/* <Card.Meta>
						<span className='date'>Average snowfall</span>
					</Card.Meta> */}
					{/* <Card.Description>Description here</Card.Description> */}
				</Card.Content>
				<Card.Content extra>
					<Icon name='world' />
					{region.mountains ? region.mountains.length : 0 } Mountains
				</Card.Content>
			</Card>
		</Fragment>
	)
}

export default RegionCard

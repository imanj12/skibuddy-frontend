import React, {Component, Fragment} from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'

class RegionCard extends Component {
  constructor() {
	  super()
	  this.state = {
			region: null,
			mountains: []
	  }
	}
	
	// fetch all mountains of this region
	fetchMountains = () => {
		let url = `http://localhost:3000/regions/${this.props.region.id}`
		fetch(url)
			.then(res => res.json())
			.then(data => this.setState({mountains: data.mountains}))
	}

  componentDidMount() {
		this.setState({region: this.props.region})
		this.fetchMountains()
  }
  
	render() {
		return (
			<Fragment>
				<Card>
					<Image src='https://www.worldatlas.com/r/w728-h425-c728x425/upload/44/5d/77/shutterstock-519106648.jpg' />
					<Card.Content>
						<Card.Header>{this.props.region.name}</Card.Header>
						<Card.Meta>
							<span className='date'>Average snowfall</span>
						</Card.Meta>
						<Card.Description>Description here</Card.Description>
					</Card.Content>
					<Card.Content extra>
						<a>
							<Icon name='world' />
							{this.state.mountains.length} Mountains
						</a>
					</Card.Content>
				</Card>
	 		</Fragment>
	  )
	}
}

export default RegionCard

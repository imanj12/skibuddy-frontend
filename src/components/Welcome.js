import React from 'react'
import { Container, Message } from 'semantic-ui-react'

const Welcome = () => {
   return (
      <Container text className='padded-top-small'>
         <Message>
            <Message.Header>Welcome!</Message.Header>
            <Message.Content>
            <p>SkiBuddy helps you quickly check weather conditions and browse an interactive trail map at most, if not all, ski resorts in the United States.</p>
   
            <p>To add a ski resort to your collection, select "New Mountain" in the navigation bar above.</p>

            <p>Browse the mountains and regions already created below.</p>
            </Message.Content>
         </Message>
      </Container>
   )
}

export default Welcome



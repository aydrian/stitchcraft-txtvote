import React from 'react'
import { Card, Image } from 'semantic-ui-react'

const Entry = ({ name, image, votes }) => {
  return (
    <Card>
      <Image
        src={`http://${image.bucket}.s3.amazonaws.com/${encodeURIComponent(
          image.key
        )}`}
      />
      <Card.Content>
        <Card.Header>{name}</Card.Header>
      </Card.Content>
      <Card.Content extra>{votes.length || 0} Votes</Card.Content>
    </Card>
  )
}

const Entries = ({ entries }) => {
  return (
    <Card.Group centered itemsPerRow="5">
      {entries.map(entry => {
        return <Entry key={entry.key} name={entry.key} {...entry} />
      })}
    </Card.Group>
  )
}

export default Entries

import React, { Component } from 'react'
import {
  Stitch,
  AnonymousCredential,
  RemoteMongoClient
} from 'mongodb-stitch-browser-sdk'
import { ObjectId } from 'bson'
import { Container, Header, Button } from 'semantic-ui-react'

import Entries from './components/Entries'

const githubButtonStyle = {
  position: 'fixed',
  margin: '1em',
  top: 0,
  right: 0,
  zIndex: 6
}

class App extends Component {
  constructor(props) {
    super(props)

    this.appId = 'stitchcraft-txtvote-xlhrw'
    this.contest_id = new ObjectId('5c0eb1151c9d440000212c19')

    this.state = {
      contest: {
        entries: []
      }
    }
  }

  componentDidMount() {
    this.client = Stitch.initializeDefaultAppClient(this.appId)
    this.client.auth.loginWithCredential(new AnonymousCredential())
    this.mongodb = this.client.getServiceClient(
      RemoteMongoClient.factory,
      'mongodb-atlas'
    )

    this.fetchContest()

    this.mongodb
      .db('data')
      .collection('contests')
      .watch([this.contest_id])
      .then(stream => {
        stream.onNext(e => {
          this.setState({ contest: e.fullDocument })
        })
      })
      .catch(err => console.error)
  }

  fetchContest() {
    this.mongodb
      .db('data')
      .collection('contests')
      .find({ _id: this.contest_id })
      .asArray()
      .then(results => {
        this.setState({ contest: results[0] })
      })
  }

  render() {
    const { entries } = this.state.contest
    return (
      <Container>
        <style>{`
          html, body {
            background-color: #b7092b !important;
          }

          .ui.header {
            color: #ffffff;
          }

          .ui.block.header {
            background-color: #48993f;
          }
        `}</style>
        <Header as="h1" textAlign="center" block>
          {this.state.contest.name}
        </Header>
        <Header as="h2" textAlign="center">
          To Vote: Text the name of the entry to{' '}
          <pre style={{ display: 'inline' }}>516-830-4402</pre>.
        </Header>
        {entries.length > 0 ? (
          <Entries entries={entries} />
        ) : (
          <Header as="h3" textAlign="center">
            No Entries
          </Header>
        )}
        <div style={githubButtonStyle}>
          <Button
            as="a"
            href={`https://github.com/aydrian/stitchcraft-txtvote/`}
            icon="github"
            content="Source"
            secondary
            target="_blank"
          />
        </div>
      </Container>
    )
  }
}

export default App

import React, { Component } from 'react'
import {
  Stitch,
  AnonymousCredential,
  RemoteMongoClient
} from 'mongodb-stitch-browser-sdk'
import { ObjectId } from 'bson'
import { Container, Card, Image, Header, Button, Icon } from 'semantic-ui-react'
const seconds = m => m * 1000

class App extends Component {
  constructor(props) {
    super(props)

    this.appId = 'stitchcraft-test-yxsvi'
    this.contest_id = new ObjectId('5c0eb1151c9d440000212c19')

    this.state = {
      contest: {
        entries: []
      },
      refresh: true
    }

    this.intervalRef = null
    this.toggleRefresh = this.toggleRefresh.bind(this)
  }

  componentDidMount() {
    this.client = Stitch.initializeDefaultAppClient(this.appId)
    this.client.auth.loginWithCredential(new AnonymousCredential())
    this.mongodb = this.client.getServiceClient(
      RemoteMongoClient.factory,
      'mongodb-atlas'
    )

    this.fetchContest()
    this.initTimer()

    /*this.mongodb
      .db('data')
      .collection('contests')
      .watch([this.contest_id])
      .then(stream => {
        console.log('Resolving watch')
        console.log(stream)
        stream.onNext(e => {
          console.log('Watch update', e.fullDocument)
          this.setState({ contest: e.fullDocument })
        })
      })
      .catch(err => {
        console.log('In the catch')
        console.log(err)
      })*/
  }

  componentWillUnmount() {
    this.cancelTimer()
  }

  fetchContest() {
    console.log('Fetching Contest...')
    this.mongodb
      .db('data')
      .collection('contests')
      .find({ _id: this.contest_id })
      .asArray()
      .then(results => {
        this.setState({ contest: results[0] })
      })
  }

  initTimer() {
    this.intervalRef = setInterval(this.fetchContest.bind(this), seconds(5))
  }

  cancelTimer() {
    if (this.intervalRef) {
      clearInterval(this.intervalRef)
    }
  }

  toggleRefresh() {
    if (this.state.refresh) {
      this.setState({ refresh: false })
      this.cancelTimer()
    } else {
      this.setState({ refresh: true })
      this.initTimer()
    }
  }

  render() {
    console.log(this.state)
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
        <Button
          toggle
          active={this.state.refresh}
          onClick={this.toggleRefresh}
          size="mini"
          compact
        >
          <Icon name="refresh" />
          Auto-Refresh
        </Button>
        {entries.length && (
          <Card.Group centered itemsPerRow="5">
            {entries.map(entry => {
              return (
                <Card key={entry.key}>
                  <Image
                    src={`http://${
                      entry.image.bucket
                    }.s3.amazonaws.com/${encodeURIComponent(entry.image.key)}`}
                  />
                  <Card.Content>
                    <Card.Header>{entry.key}</Card.Header>
                  </Card.Content>
                  <Card.Content extra>
                    {entry.votes.length || 0} Votes
                  </Card.Content>
                </Card>
              )
            })}
          </Card.Group>
        )}
      </Container>
    )
  }
}

export default App

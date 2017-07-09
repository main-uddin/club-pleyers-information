import React, { Component } from 'react'

class Football extends Component {
  constructor (props) {
    super(props)
    this.state = {
      players: []
    }
  }
  render () {
    return (
      <div>
        <pre>
          {this.state.players}
        </pre>
      </div>
    )
  }
  componentDidMount () {
    window.fetch('https://cors-anywhere.herokuapp.com/http://api.football-data.org/v1/teams/65/players')
            .then(data => data.json())
            .then(meta => {
              const playerArr = meta.players
              const newPlayerArr = JSON.stringify(playerArr, null, 2)
              this.setState({
                players: newPlayerArr
              })
            })
  }
}

export default Football

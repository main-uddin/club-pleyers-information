import React, { Component } from 'react'

const { fetch } = window

class Football extends Component {
  constructor (props) {
    super(props)
    this.state = {
      teams: [],
      players: '',
      link: ''
    }
  }
  render () {
    return (
      <div>
        <select onChange={e => this.setState({ link: e.target.value })}>
          {this.state.teams.map((el, idx) => (
            <option key={idx} value={el.link}>{el.name}</option>
          ))}
        </select>
        <button onClick={this.getPlayers.bind(this)}>Show Players</button>
        <pre>{this.state.players}</pre>
      </div>
    )
  }

  getPlayers () {
    fetch(`http://cors-anywhere.herokuapp.com/${this.state.link}`)
      .then(r => r.json())
      .then(team =>
        this.setState({ players: JSON.stringify(team.players, null, 2) })
      )
  }

  componentDidMount () {
    fetch(
      'https://cors-anywhere.herokuapp.com/' +
        'https://api.football-data.org/v1/competitions/398/teams'
    )
      .then(r => r.json())
      .then(r => r.teams)
      .then(teams =>
        teams.map(el => ({
          name: el.name,
          link: el._links.players.href
        }))
      )
      .then(teams => this.setState({ teams }))
  }
}

export default Football

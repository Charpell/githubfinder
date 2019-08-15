import React, { Component } from 'react'

import UserItem from './UserItem';

export default class Users extends Component {
  state = {
    users: [
      {
        id: '1',
        login: 'charpell',
        avatar_url: 'https://avatars0.githubusercontent.com/u/21138774?s=460&v=4',
        html_url: 'https://github.com/Charpell'
      },
      {
        id: '2',
        login: 'charpell',
        avatar_url: 'https://avatars0.githubusercontent.com/u/21138774?s=460&v=4',
        html_url: 'https://github.com/Charpell'
      },
      {
        id: '3',
        login: 'charpell',
        avatar_url: 'https://avatars0.githubusercontent.com/u/21138774?s=460&v=4',
        html_url: 'https://github.com/Charpell'
      }
    ]
  }
  
  render() {
    return (
      <div style={userStyle}>
        {this.state.users.map(user => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>
    )
  }
}

const userStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridGap: '1rem'
}
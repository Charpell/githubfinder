import React, { Component } from 'react'

export default class UserItem extends Component {
  state = {
    id: 'id',
    login: 'charpell',
    avatar_url: 'https://avatars0.githubusercontent.com/u/21138774?s=460&v=4',
    html_url: 'https://github.com/Charpell'
  }
  render() {
    const { avatar_url, login, html_url } = this.state;

    return (
      <div className="card text-center">
        <img 
          src={avatar_url}
          alt=''
          className='round-img'
          style={{ width: '60px' }}
        />
        <h3>{login}</h3>

        <div>
          <a href={html_url} className="btn btn-dark btn-sm my-1">More</a>
        </div>
      </div>
    )
  }
}

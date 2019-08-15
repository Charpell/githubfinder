import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import axios from 'axios'

import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search'
import About from './components/pages/About'
import Alert from './components/layout/Alert'
import User from './components/users/User';

class App extends Component {
  state = {
    users: [],
    user: {},
    loading: false,
    alert: null
  }

  // async componentDidMount() {
  //   this.setState({ loading: true })
  //   const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)

  //   this.setState({ users: res.data, loading: false })
  // }
  
  searchUsers = async text => {
    this.setState({ loading: true })
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)

    this.setState({ users: res.data.items, loading: false })
  }

  getUser = async (username) => {
    this.setState({ loading: true })
    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)

    this.setState({ user: res.data, loading: false })
  }

  clearUsers = () => {
    this.setState({ users: [], loading: false })
  }

  setAlert = (message, type) => {
    this.setState({ alert: { message, type }})
    setTimeout(() => this.setState({ alert: null }), 5000)
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Switch>  
              <Route exact path="/" render={props => (
                <Fragment>
                  <Alert alert={this.state.alert} />
                  <Search 
                    searchUsers={this.searchUsers} 
                    clearUsers={this.clearUsers} 
                    showClear={this.state.users.length > 0 ? true : false } 
                    setAlert={this.setAlert}
                  />
                  <Users 
                    loading={this.state.loading} 
                    users={this.state.users} 
                  />
                </Fragment>
              )}
              />
              <Route exact path='/about' component={About} />
              <Route exact path='/user/:login' render={props => (
                <User {...props} getUser={this.getUser} user={this.state.user} loading={this.state.loading} />
              )} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;

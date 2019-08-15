import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import axios from 'axios'

import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search'
import About from './components/pages/About'

class App extends Component {
  state = {
    users: [],
    loading: false
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

  clearUsers = () => {
    this.setState({ users: [], loading: false })
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
                  <Search 
                    searchUsers={this.searchUsers} 
                    clearUsers={this.clearUsers} 
                    showClear={this.state.users.length > 0 ? true : false } 
                  />
                  <Users 
                    loading={this.state.loading} 
                    users={this.state.users} 
                  />
                </Fragment>
              )}
              />
              <Route exact path='/about' component={About} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;

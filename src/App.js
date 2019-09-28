

import React, { Fragment, Component } from 'react';
// React.Fragment wraps elements and doesn't render in the DOM
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Users from './components/users/Users'
import User from './components/users/User'
import Search from './components/users/Search'
import Alert from './components/layout/Alert'
import About from './components/pages/About'
import axios from 'axios'
import './App.css';
 
class App extends Component {
  state = {
    user: {},
    users: [],
    loading: false,
    alert: null
  }
 
  
 
  //  Search Github Users
  searchUsers = async (text) => {
    this.setState({ loading: true })
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    this.setState({ users: res.data.items, loading: false })
  }
 
  // Get single Github User
  getUser = async username => {
    this.setState({ loading: true })
 
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      )
    
    this.setState({ user: res.data, loading: false })
  }
 
  // Clear Github Users
  clearUsers = () => {
    this.setState({ users: [], loading: false })
  }
 
  // Alert for Empty Search
  setAlert = (msg, type) => {
    this.setState({ alert: {msg: msg, type: type} })
 
    setTimeout(() => this.setState({ alert: null }), 2000)
  }
 
  render() {
    const { users, user, loading } = this.state
 
    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Alert alert={this.state.alert} />
            <Switch>
              <Route exact path='/' render={props => (
                <Fragment>
                  <Search 
                    searchUsers={this.searchUsers} 
                    clearUsers={this.clearUsers} 
                    showClear={ users.length > 0 ? true : false }
                    setAlert={this.setAlert}
                  />
                  <Users loading={loading} users={users} />
                </Fragment>
              )} />
              <Route exact path="/about" component={About} />
              <Route exact path='/user/:login' render={props => (
                <User 
                  {...props} 
                  getUser={this.getUser} 
                  user={user} 
                  loading={loading} 
                />
              )} />
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}
 
export default App;

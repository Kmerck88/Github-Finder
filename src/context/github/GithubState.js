import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USER,
  GET_USERS,
  GET_REPOS,
  CLEAR_USERS
} from '../types';

const GithubState = props => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loadind: false
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  // Search Users
  const searchUsers = async (text) => {
    setLoading(true);
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    
    dispatch({
      type: SEARCH_USERS, 
      Payload: res.data.items
    })
      }
 

  // Get User
  const getUser = async username => {
    setLoading();
 
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      )
    
   dispatch({
     type:GET_USER, 
     Payload: res.data
   });
  };

  // Get Repos

  //Clear Users
  const clearUsers = () => dispatch({type: CLEAR_USERS});

  //Set Loading
  const setLoading = () => dispatch ({type: SET_LOADING})

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading, 
        searchUsers,
        clearUsers, 
        getUser
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;

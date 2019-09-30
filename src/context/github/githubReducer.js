import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USER,
  GET_USERS,
  GET_REPOS
} from '../types';

export default (state, action) => { 
  switch(action.type){ 
    case SEARCH_USERS:
      return {
        ...state,
        users: action.payload, 
        loading: false
      }
    case SET_LOADING: 
    return { 
      ...state,
      loading:true
    }
    defualt: 
    return state;
  }
}
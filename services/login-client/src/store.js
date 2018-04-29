import {routerReducer, routerMiddleware} from 'react-router-redux'

import {createStore, applyMiddleware, combineReducers} from 'redux'
import createHistory from 'history/createBrowserHistory'

const history = createHistory()

const initialState = {
  isAuthenticated: false
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'AUTH_SUCCESS':
      return {
        ...state,
        isAuthenticated: true
      }
    case 'AUTH_FAIL':
      return {
        ...state,
        isAuthenticated: false
      }
    default:
      return state
  }
}

const store = createStore(combineReducers({routerReducer, authReducer}), applyMiddleware(routerMiddleware(history)),)

export default store;

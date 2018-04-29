import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {ConnectedRouter, routerReducer, routerMiddleware} from 'react-router-redux'

import {createStore, applyMiddleware, combineReducers} from 'redux'
import createHistory from 'history/createBrowserHistory'
import {Route, Switch} from 'react-router'

import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Forgot from './components/Forgot';
import PrivateRoute from './components/PrivateRoute';

import authReducer from './reducers';

const history = createHistory()

const store = createStore(combineReducers({routerReducer, authReducer}), applyMiddleware(routerMiddleware(history)),)

render(<Provider store={store}>
  <ConnectedRouter history={history}>
    <Switch>
      <Route path="/login" component={Login}/>
      <Route path="/register" component={Register}/>
      <Route path="/forgot" component={Forgot}/>
      <PrivateRoute path="/" component={Home}/>
    </Switch>
  </ConnectedRouter>
</Provider>, document.getElementById('root'),)

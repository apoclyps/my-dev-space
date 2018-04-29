import {connect} from 'react-redux'

import {push} from 'react-router-redux'

import HomeContainer from '../containers/Home';

const authFail = () => ({
  type: 'AUTH_FAIL'
})

const Home = connect(null, dispatch => ({
  logout: () => {
    dispatch(authFail())
    dispatch(push('/login'))
  }
}))(HomeContainer)

export default Home;

import {connect} from 'react-redux'

import {push} from 'react-router-redux'

import ForgotContainer from '../containers/Forgot';

// const authSuccess = () => ({
//   type: 'AUTH_SUCCESS'
// })

const Forgot = connect(null, dispatch => ({
  forgot: () => {
    // dispatch(authSuccess())
    dispatch(push('/forgot'))
  }
}))(ForgotContainer)

export default Forgot;

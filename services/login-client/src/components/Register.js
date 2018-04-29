import {connect} from 'react-redux'

import {push} from 'react-router-redux'

import RegisterContainer from '../containers/Register';

// const authSuccess = () => ({
//   type: 'AUTH_SUCCESS'
// })

const Register = connect(null, dispatch => ({
  register: () => {
    // dispatch(authSuccess())
    dispatch(push('/register'))
  }
}))(RegisterContainer)

export default Register;

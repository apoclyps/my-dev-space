import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import logo from '../img/logo.jpg';
import '../index.css';
import '../js/my-login.js'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

class LoginContainer extends Component {
  render() {
    return (<div className="my-login-page">
      <section className="h-100">
        <div className="container h-100">
          <div className="row justify-content-md-center h-100">
            <div className="card-wrapper">
              <div className="brand">
                <Link to='/'>
                  <img src={logo} alt="Northern Ireland Developer Network Logo"/>
                </Link>
              </div>
              <div className="card fat">
                <div className="card-body">
                  <h4 className="card-title">Login</h4>
                  <form method="POST">

                    <div className="form-group">
                      <label htmlFor="email">E-Mail Address</label>

                      <input id="email" type="email" className="form-control" name="email" required="required" autoFocus="autoFocus"/>
                    </div>

                    <div className="form-group">
                      <label htmlFor="password">Password
                        <Link to='/forgot' className="float-right">Forgot Password?</Link>
                      </label>
                      <input id="password" type="password" className="form-control" name="password" required="required" data-eye="data-eye"/>
                    </div>

                    <div className="form-group">
                      <label>
                        <input type="checkbox" name="remember"/> Remember Me
                      </label>
                    </div>

                    <div className="form-group no-margin">
                      <button type="submit" className="btn btn-primary btn-block" onClick={this.props.login}>
                        Login
                      </button>
                    </div>
                    <div className="margin-top20 text-center">
                      Don't have an account? <Link to='/register'>Create One</Link>
                    </div>
                  </form>
                </div>
              </div>
              <div className="footer">
                Copyright &copy; NI Technology Network 2018
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>);
  }
}

export default LoginContainer;

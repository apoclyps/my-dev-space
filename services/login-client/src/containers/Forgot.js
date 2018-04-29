import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import logo from '../img/logo.jpg';
import '../index.css';
import '../js/my-login.js'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

class ForgotContainer extends Component {
  render() {
    return (<div className="my-login-page">
    <section className="h-100">
      <div className="container h-100">
        <div className="row justify-content-md-center align-items-center h-100">
          <div className="card-wrapper">
            <div className="brand">
              <Link to='/'>
                <img src={logo} alt="Northern Ireland Developer Network Logo"/>
              </Link>
            </div>
            <div className="card fat">
              <div className="card-body">
                <h4 className="card-title">Forgot Password</h4>
                <form method="POST">

                  <div className="form-group">
                    <label for="email">E-Mail Address</label>
                    <input id="email" type="email" className="form-control" name="email" value="" required autofocus/>
                    <div className="form-text text-muted">
                      By clicking "Reset Password" we will send a password reset link
                    </div>
                  </div>

                  <div className="form-group no-margin">
                    <button type="submit" className="btn btn-primary btn-block">
                      Reset Password
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="footer">
              Copyright &copy; Your Company 2017
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>);
  }
}

export default ForgotContainer;

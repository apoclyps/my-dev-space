import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import logo from '../img/logo.jpg';
import '../index.css';
import '../js/my-login.js'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

class RegisterContainer extends Component {
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
                <h4 className="card-title">Register</h4>
                <form method="POST">

                  <div className="form-group">
                    <label for="name">Name</label>
                    <input id="name" type="text" className="form-control" name="name" required="required" autoFocus="autoFocus"/>
                  </div>

                  <div className="form-group">
                    <label for="email">E-Mail Address</label>
                    <input id="email" type="email" className="form-control" name="email" required="required"/>
                  </div>

                  <div className="form-group">
                    <label for="password">Password</label>
                    <input id="password" type="password" className="form-control" name="password" required="required" data-eye/>
                  </div>

                  <div className="form-group">
                    <label>
                      <input type="checkbox" name="aggree" value="1"/> I agree to the Terms and Conditions
                    </label>
                  </div>

                  <div className="form-group no-margin">
                    <button type="submit" className="btn btn-primary btn-block">
                      Register
                    </button>
                  </div>
                  <div className="margin-top20 text-center">
                    Already have an account? <Link to='/login'>Register</Link>
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

export default RegisterContainer;

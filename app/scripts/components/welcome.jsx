var React = require('react');
var Backbone = require('backbone');
var $ = require('jquery');

var User = require('../models/user').User;


var Welcome = React.createClass({
  getInitialState: function(){
    return {
    };
  },
    componentWillMount: function(){
    var self = this;
  },
  handleLoginSubmit: function(e){
    e.preventDefault();
    var self = this;
    var username = $('#username').val();
    var password = $('#password').val();

    User.login(username, password, {
      success: function(response){
        self.props.router.navigate('schedules/', {trigger: true});
      },
      fail: function(response){
        alert('Login failed. Please check user name or password.');
      }
    });
    localStorage.setItem('username', username)
  },
  render: function(){
    return (
      <div>
        <div className="welc-area col-md-offset-1 col-md-10">
          <div className="welc-box-b">
            <div className="welc-logo">
              <div className="icon-lrg">
                <img src="images/PoolParty_purplelogtag.png"></img>
              </div>
              <div className="log-copy">
                <p>Welcome to the app that makes it easy to create and join a school car pool for your little students! Here’s <a href="#B">how it works...</a></p>
                <p><a href="#signup/">Click here</a> if you’re wanting to join!</p>
              </div>
            </div>
          </div>
          <div className="welc-box-a">
            <div className="welc-login">
              <div>
                <h3 id="form-title">Log In...</h3>
              </div>
              <form onSubmit={this.handleLoginSubmit}>
                <label htmlFor="username">User Name</label>
                <input type="username" className="form-control log-entry" id="username" placeholder="Enter your user name"></input>
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control log-entry" id="password" placeholder="Enter password"></input>
                <input type="submit" className="btn btn-success btn-sm" value="Login"></input>
              </form>
              <div className="open-links">Not signed up yet? <a href="#signup/">Click here</a>
              </div>
            </div>
          </div>
          <div className="welc-box-a">
            <div className="welc-info">
              <a name="B" /><p>One of the hardest aspects of your children attending school is getting them there and back! Often, there is no easy way for you personally to transport them, and even harder to find other parents who might have interest in a car pool to lessen the daily commitment.</p>
              <p>That’s where Pool Party comes in.</p>
              <p>With Pool Party, you just sign up by telling us some brief information about you & your child, their school, and then we send you an invitation to register and get started.</p>
              <p>Within no time, you can create your own car pool group, have a schedule set up, and be provided with directions on where each Group member lives…and all based on the school your child attends and convenience to where you live.</p>
              <p>So sign up today and we’ll provide you with information on how to quickly become a member of your own car pool!</p>
              <p>Let’s get this Pool Party started!</p>
            </div>
          </div>
          <div className="welc-box-b">
            <div className="welc-art">
              <img className="img-responsive" src="./images/welcome.png" />
            </div>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = Welcome;

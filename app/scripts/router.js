var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');

var Welcome = require('./components/welcome.jsx');
var Login = require('./components/login.jsx');
var Signup = require('./components/signup.jsx');
var GroupSetup = require('./components/group-setup.jsx').GroupSetup;
var MapSchedule = require('./components/map.jsx').MapSchedule;
var User = require('./models/user').User;

var CommentBox = require('./components/comments.jsx').CommentBox;


var Router = Backbone.Router.extend({
  routes: {
    '': 'welcomeController',
    'index': 'welcomeController',
    'login/': 'loginController',
    'signup/': 'signupController',
    'groups/': 'groupCreate',
    'schedules/': 'scheduleController',
  },
  initialize: function(){
    if (User.isAuthenticated()) {
      var currentParent = User.restore();
    }
  },

  welcomeController: function(){
    var self = this;
    ReactDOM.render(
      React.createElement(Welcome, {router: self}),
      document.getElementById('container')
    )
  },
  loginController: function(){
    var self = this;
    ReactDOM.render(
      React.createElement(Login, {router: self}),
      document.getElementById('container')
    )
  },
  signupController: function(){
    var self = this;
    ReactDOM.render(
      React.createElement(Signup, {router: self}),
      document.getElementById('container')
    );
  },
  groupCreate: function(){
    var self = this;
    ReactDOM.render(
      React.createElement(GroupSetup, {router: self}),
      document.getElementById('container')
    );
  },
  scheduleController: function(){
    var self = this;
    ReactDOM.render(
      React.createElement(MapSchedule, {router: self}),
      document.getElementById('container')
    );
  },
  CommentBox: function(){
    var self = this;
    ReactDOM.render(
      React.createElement(CommentBox, {router: self}),
      document.getElementById('container')
    );
  },
});

var router = new Router();


module.exports = router;

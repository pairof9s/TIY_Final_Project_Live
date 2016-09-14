var React = require('react');
var Backbone = require('backbone');
var $ = require('jquery');

var Group = require('../models/groups').Group;
var GroupCollection = require('../models/groups').GroupCollection;
var CommentBox = require('../components/comments.jsx').CommentBox;


var NavTitle = React.createClass({
  handleSignOut: function(){
    localStorage.clear();
  },
  render: function(){
    var user = JSON.parse(localStorage.getItem('user'));
    return (
      <div className="row">
        <div className="col-xs-12">
          <div className="pull-right">
            <div className="row active-user">
              <span className="glyphicon glyphicon-user" aria-hidden="true"></span>
              <h5>{user.username}</h5>
              <div className="active-btn btn btn-sm btn-link" onClick={this.handleSignOut}>
                <a href="#" className="sign-out">Sign Out</a>
              </div>
            </div>
          </div>
          <div>
            <div className="icon-third"><a href="#"><img src="images/PoolParty_purplelog.png"></img></a></div>
          </div>
        </div>
      </div>
    )
  }
});

var OurGroup = React.createClass({
  getInitialState: function() {
    return {
      myGroup: '',
    };
  },
  componentDidMount: function() {
    this.serverRequest = $.get(this.props.source, function (result) {
      var myGroup = result[0];
      this.setState({
        url: 'https://d9-dev-server.herokuapp.com/classes/D9groups'
      });
    }.bind(this));
  },
  componentWillUnmount: function() {
    this.serverRequest.abort();
  },
  render: function() {
    return (
      <div>
        {myGroup}
      </div>
    );
  }
});

var MapSchedule = React.createClass({
  getInitialState: function(){
    return {
    };
  },
  componenntDidMount: function(){
    var ourGroup = this.state.ourGroup;
    // console.log(ourGroup);
    this.state.ourGroup.fetch([myGroup]).done(function(){
      self.forceUpdate();
    });
  },
  render: function(){
    var user = JSON.parse(localStorage.getItem('user'));
    return (
      <div>
        <div className="col-xs-offset-1 col-xs-10 col-md-offset-2 col-md-8">
          <div>
            <NavTitle />
          </div>
          <div>
            <h1 id="page-title">Hi, {user.firstname1}!</h1>
          </div>
          <div className="sect-sep">
            <p>The Pool Party has started! As you will see, your Group is only display, providing information concerning the students, their school, their parent’s name, home address, phone and email. The lower level contains the current month’s schedule as well as a request board for schedule changes.</p>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="subtitle"><h2><img src="./images/our-group.png" className="panel-art"/> Our Group</h2></div>
              <div className="well table-responsive">
                <table border="1" className="table">
                  <thead>
                    <tr>
                      <th>Group Information:</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{OurGroup}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div>

            </div>
          </div>
          <div className="sect-sep"></div>
          <div className="row">
            <div className="col-md-7">
              <div className="subtitle"><h2><img src="./images/schedule-cal.png" className="panel-art"/> Schedule Area</h2>
              </div>
            </div>

            <div className="col-md-5">
              <div className="subtitle"><h2><img src="./images/chat.png" className="panel-art"/> Let's Chat..</h2>
              </div>
              <div>
                <CommentBox />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
});


module.exports = {
  'MapSchedule': MapSchedule,
};
// Google Map key >>  AIzaSyCTxwfw21PFbas9U69kH7ZhmmtvGWgjzJU

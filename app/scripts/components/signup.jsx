var React = require('react');
var Backbone = require('backbone');
var $ = require('jquery');

var User = require('../models/user').User;
var Student = require('../models/students').Student;
var StudentCollection = require('../models/students').StudentCollection;


// Second Parent form On-Off toggle
var isDefined = function(val) {
	return val != null;
}

var ToggleDisplay = React.createClass({

	propTypes: {
		hide: React.PropTypes.bool,
		show: React.PropTypes.bool
	},

	shouldHide: function() {
		var shouldHide;
		if(isDefined(this.props.show)) {
			shouldHide = !this.props.show;
		}
		else if(isDefined(this.props.hide)) {
			shouldHide = this.props.hide;
		}
		else {
			shouldHide = false;
		}

		return shouldHide;
	},

	render: function() {
		var style = {};

		if(this.shouldHide()) {
			style.display = 'none';
		}

		return (
			<span style={style} {...this.props} />
		);
	}
});

// Student selection and Primary Parent form
var Signup = React.createClass({
  getInitialState: function(){
    return {
			show: true,
			student: '',
			school: '',
			grade: '',
			gender: '',
			username: '',
			password: '',
			firstname1: '',
			lastname1: '',
			street1: '',
			city1: '',
			state1: '',
			zip1: '',
			phone1: '',
			email1: '',
			firstname2: '',
			lastname2: '',
			street2: '',
			city2: '',
			state2: '',
			zip2: '',
			phone2: '',
			email2: '',
			// studentList: new StudentCollection,
    };
  },
  componentWillMount: function(){
    var self = this;
		// this.state.studentList.fetch().done(function(){
		// 	self.forceUpdate();
		// });
  },
	handleSignupSubmit: function(e){
    e.preventDefault();
    var self = this;
		var student = $('#new-student').val();
		var school = $('#new-school').val();
		var grade = $('#new-grade').val();
		var gender = $('#new-gender').val();
		var username = $('#new-username').val();
		var password = $('#new-password').val();
		var firstname1 = $('#new-firstname1').val();
		var lastname1 = $('#new-lastname1').val();
		var street1 = $('#new-street1').val();
		var city1 = $('#new-city1').val();
		var state1 = $('#new-state1').val();
		var zip1 = $('#new-zip1').val();
		var phone1 = $('#new-phone1').val();
    var email1 = $('#new-email1').val();
		var firstname2 = $('#new-firstname2').val();
		var lastname2 = $('#new-lastname2').val();
		var street2 = $('#new-street2').val();
		var city2 = $('#new-city2').val();
		var state2 = $('#new-state2').val();
		var zip2 = $('#new-zip2').val();
		var phone2 = $('#new-phone2').val();
		var email2 = $('#new-email2').val();

    var user = new User();
    user.set({'student': student, 'school': school, 'grade': grade, 'gender': gender, 'username': username, 'password': password, 'firstname1': firstname1, 'lastname1': lastname1, 'street1': street1, 'city1': city1, 'state1': state1, 'zip1': zip1, 'phone1': phone1, 'email1': email1, 'firstname2': firstname2, 'lastname2': lastname2, 'street2': street2, 'city2': city2, 'state2': state2, 'zip2': zip2, 'phone2': phone2, 'email2': email2});

    user.save().done(function(){
    self.props.router.navigate('login/', {trigger: true})
    }).fail(function(){
      alert('Inproper Sign Up. Check your email address and/or password.')
    });
  },
	handleClick: function() {
	    this.setState({ show: !this.state.show });
	},
  render: function(){
    return (
      <div>
        <div className="col-xs-offset-1 col-xs-10 col-md-offset-2 col-md-8">
          <div className="icon-third"><a href="#login/"><img src="images/PoolParty_purplelog.png"></img></a></div>
          <div>
						<h1 id="page-title">Register to join Pool Party</h1>
					</div>
          <div className="sect-sep">
            <p>This is copy that instructs on how to register as a new user in Pool Party. You must know your child’s current school. Registration will require name, address, phone, and confirmation via email link provided.</p>
          </div>
        </div>
        <form onSubmit={this.handleSignupSubmit}>
          <div className="col-xs-offset-1 col-xs-10 col-md-offset-2 col-md-8">
            <div>
              <h2><img src="./images/security.png" className="panel-art" />First, create your user name & password</h2>
            </div>
						<div className="row form-group">
							<div className="col-sm-4">
								<input type="username" className="form-control" id="new-username" placeholder="User Name" />
							</div>
							<div className="col-sm-4">
								<input type="password" className="form-control" id="new-password" placeholder="Password" />
							</div>
						</div>
						<div className="sect-sep"></div>
						<div>
							<h2><img src="./images/schoolhands.png" className="panel-art" />..then provide your child’s information</h2>
						</div>
						<div className="row form-group">
							<div className="col-sm-4">
								<input type="student" className="form-control" id="new-student" placeholder="Child’s full name..." />
							</div>
							<div className="col-sm-4">
								<select type="school" className="form-control" id="new-school">
									<option value=''>School</option>
									<option value="" disabled>–– Elementary Schools ––</option>
									<option>Bell’s Crossing Elementary School</option>
									<option>Bethel Elementary School</option>
									<option>Bryson Elementary School</option>
									<option>Mauldin Elementary School</option>
									<option>Oakview Elementary School</option>
									<option>Rudolf Gordon Elementary School</option>
									<option value="" disabled>–– Middle Schools ––</option>
									<option>Beck Academy School</option>
									<option>Bryson Academy School</option>
									<option>Hillcrest Middle School</option>
									<option>League Academy School</option>
									<option>Mauldin Middle School</option>
									<option>Northwood Middle School</option>
									<option>Ralph Chandler Middle School</option>
									<option value="" disabled>–– High Schools ––</option>
									<option>Berea High School</option>
									<option>Eastside High School</option>
									<option>Greenville High School</option>
									<option>Hillcrest High School</option>
									<option>J.L. Mann High School</option>
									<option>Mauldin High School</option>
									<option>Riverside High School</option>
									<option>Travelers Rest High School</option>
									<option>Wade Hampton High School</option>
								</select>
							</div>
							<div className="col-sm-2">
								<select type="grade" className="form-control" id="new-grade">
									<option>Grade</option>
									<option>12</option>
									<option>11</option>
									<option>10</option>
									<option>9</option>
									<option>8</option>
									<option>7</option>
									<option>6</option>
									<option>5</option>
									<option>4</option>
									<option>3</option>
									<option>2</option>
									<option>1</option>
								</select>
							</div>
							<div className="col-sm-2">
								<select type="gender" className="form-control" id="new-gender">
									<option>Gender</option>
									<option>F</option>
									<option>M</option>
								</select>
							</div>
						</div>
						<div className="sect-sep"></div>
            <div className="row">
              <h2><img src="./images/parents.png" className="panel-art" />Primary Parent’s Information:</h2>
              <div className="col-md-10">
                <div className="form-group col-xs-6 col-md-6">
                    <label htmlFor="new-firstname1" className="control-label">First Name</label>
                    <input type="text" className="form-control" id="new-firstname1" placeholder="First name..." />
                </div>
                <div className="form-group col-xs-6 col-md-6">
                    <label htmlFor="new-lastname1" className="control-label">Last Name</label>
                    <input type="text" className="form-control" id="new-lastname1" placeholder="Last name..." />
                </div>
                <div className="form-group col-xs-12">
                  <label htmlFor="new-street1" className="control-label">Street Address</label>
                  <input type="text" className="form-control" id="new-street1" placeholder="Street address (no P.O. Box)" />
                </div>
                <div className="form-group col-xs-4 col-md-4">
                    <label htmlFor="new-city1" className="control-label">City</label>
                    <input type="text" className="form-control" id="new-city1" placeholder="City..." />
                </div>
                <div className="form-group col-xs-4 col-md-4">
                    <label htmlFor="new-state1" className="control-label">State</label>
                    <select type="text" className="form-control" id="new-state1">
                      <option>Select...</option>
                      <option value="AK">Alaska</option>
                      <option value="AL">Alabama</option>
                      <option value="AR">Arkansas</option>
                      <option value="AZ">Arizona</option>
                      <option value="CA">California</option>
                      <option value="CO">Colorado</option>
                      <option value="CT">Connecticut</option>
                      <option value="DC">District of Columbia</option>
                      <option value="DE">Delaware</option>
                      <option value="FL">Florida</option>
                      <option value="GA">Georgia</option>
                      <option value="HI">Hawaii</option>
                      <option value="IA">Iowa</option>
                      <option value="ID">Idaho</option>
                      <option value="IL">Illinois</option>
                      <option value="IN">Indiana</option>
                      <option value="KS">Kansas</option>
                      <option value="KY">Kentucky</option>
                      <option value="LA">Louisiana</option>
                      <option value="MA">Massachusetts</option>
                      <option value="MD">Maryland</option>
                      <option value="ME">Maine</option>
                      <option value="MI">Michigan</option>
                      <option value="MN">Minnesota</option>
                      <option value="MO">Missouri</option>
                      <option value="MS">Mississippi</option>
                      <option value="MT">Montana</option>
                      <option value="NC">North Carolina</option>
                      <option value="ND">North Dakota</option>
                      <option value="NE">Nebraska</option>
                      <option value="NH">New Hampshire</option>
                      <option value="NJ">New Jersey</option>
                      <option value="NM">New Mexico</option>
                      <option value="NV">Nevada</option>
                      <option value="NY">New York</option>
                      <option value="OH">Ohio</option>
                      <option value="OK">Oklahoma</option>
                      <option value="OR">Oregon</option>
                      <option value="PA">Pennsylvania</option>
                      <option value="PR">Puerto Rico</option>
                      <option value="RI">Rhode Island</option>
                      <option value="SC">South Carolina</option>
                      <option value="SD">South Dakota</option>
                      <option value="TN">Tennessee</option>
                      <option value="TX">Texas</option>
                      <option value="UT">Utah</option>
                      <option value="VA">Virginia</option>
                      <option value="VT">Vermont</option>
                      <option value="WA">Washington</option>
                      <option value="WI">Wisconsin</option>
                      <option value="WV">West Virginia</option>
                      <option value="WY">Wyoming</option>
                    </select>
                  </div>
                  <div className="form-group col-xs-4 col-md-4">
                      <label htmlFor="new-zip1" className="control-label">Zip Code</label>
                      <input type="text" className="form-control" id="new-zip1" placeholder="00000" />
                  </div>
                  <div className="form-group col-xs-6">
                      <label htmlFor="new-phone1" className="control-label">Primary Phone</label>
                      <input type="text" className="form-control" id="new-phone1" placeholder="000-000-0000" />
                  </div>
                  <div className="form-group col-xs-6">
                      <label htmlFor="new-email1" className="control-label">Email</label>
                      <input type="email" className="form-control" id="new-email1" placeholder="parent1@address.com" />
                  </div>
                  <button type="button" className="btn btn-info btn-sm pull-right" onClick={ this.handleClick }>Add Secondary Parent <span className="glyphicon glyphicon-plus-sign" /></button>
              </div>
            </div>
            <div className="row">
              <ToggleDisplay show={this.state.show}></ToggleDisplay>
              <ToggleDisplay hide={this.state.show}>
                <h2><img src="./images/parents2.png" className="panel-art" />Secondary Parent’s Information:</h2>
                <div className="col-md-10">
                    <div className="form-group col-xs-6 col-md-6">
                        <label htmlFor="new-firstname2" className="control-label">First Name</label>
                        <input type="text" className="form-control" id="new-firstname2" placeholder="First name..." />
                    </div>
                    <div className="form-group col-xs-6 col-md-6">
                        <label htmlFor="new-lastname2" className="control-label">Last Name</label>
                        <input type="text" className="form-control" id="new-lastname2" placeholder="Last name..." />
                    </div>
                    <div className="form-group col-xs-12">
                      <label htmlFor="new-street2" className="control-label">Street Address</label>
                      <input type="text" className="form-control" id="new-street2" placeholder="Street address (no P.O.)..." />
                    </div>
                    <div className="form-group col-xs-4 col-md-4">
                        <label htmlFor="new-city2" className="control-label">City</label>
                        <input type="text" className="form-control" id="new-city2" placeholder="City..." />
                    </div>
                    <div className="form-group col-xs-4 col-md-4">
                      <label htmlFor="new-state2" className="control-label">State</label>
                      <select type="text" className="form-control" id="new-state2">
                        <option>Select...</option>
                        <option value="AK">Alaska</option>
                        <option value="AL">Alabama</option>
                        <option value="AR">Arkansas</option>
                        <option value="AZ">Arizona</option>
                        <option value="CA">California</option>
                        <option value="CO">Colorado</option>
                        <option value="CT">Connecticut</option>
                        <option value="DC">District of Columbia</option>
                        <option value="DE">Delaware</option>
                        <option value="FL">Florida</option>
                        <option value="GA">Georgia</option>
                        <option value="HI">Hawaii</option>
                        <option value="IA">Iowa</option>
                        <option value="ID">Idaho</option>
                        <option value="IL">Illinois</option>
                        <option value="IN">Indiana</option>
                        <option value="KS">Kansas</option>
                        <option value="KY">Kentucky</option>
                        <option value="LA">Louisiana</option>
                        <option value="MA">Massachusetts</option>
                        <option value="MD">Maryland</option>
                        <option value="ME">Maine</option>
                        <option value="MI">Michigan</option>
                        <option value="MN">Minnesota</option>
                        <option value="MO">Missouri</option>
                        <option value="MS">Mississippi</option>
                        <option value="MT">Montana</option>
                        <option value="NC">North Carolina</option>
                        <option value="ND">North Dakota</option>
                        <option value="NE">Nebraska</option>
                        <option value="NH">New Hampshire</option>
                        <option value="NJ">New Jersey</option>
                        <option value="NM">New Mexico</option>
                        <option value="NV">Nevada</option>
                        <option value="NY">New York</option>
                        <option value="OH">Ohio</option>
                        <option value="OK">Oklahoma</option>
                        <option value="OR">Oregon</option>
                        <option value="PA">Pennsylvania</option>
                        <option value="PR">Puerto Rico</option>
                        <option value="RI">Rhode Island</option>
                        <option value="SC">South Carolina</option>
                        <option value="SD">South Dakota</option>
                        <option value="TN">Tennessee</option>
                        <option value="TX">Texas</option>
                        <option value="UT">Utah</option>
                        <option value="VA">Virginia</option>
                        <option value="VT">Vermont</option>
                        <option value="WA">Washington</option>
                        <option value="WI">Wisconsin</option>
                        <option value="WV">West Virginia</option>
                        <option value="WY">Wyoming</option>
                      </select>
                    </div>
                    <div className="form-group col-xs-4 col-md-4">
                        <label htmlFor="new-zip2" className="control-label">Zip Code</label>
                        <input type="text" className="form-control" id="new-zip2" placeholder="00000" />
                    </div>
                    <div className="form-group col-xs-6">
                        <label htmlFor="new-phone2" className="control-label">Primary Phone</label>
                        <input type="text" className="form-control" id="new-phone2" placeholder="000-000-0000" />
                    </div>
                    <div className="form-group col-xs-6">
                        <label htmlFor="new-email2" className="control-label">Email</label>
                        <input type="email" className="form-control" id="new-email2" placeholder="parent2@address.com" />
                    </div>
                </div>
              </ToggleDisplay>
            </div>
            <div className="row col-md-8">
              <button type="submit" className="btn btn-success">Register</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
});


module.exports = Signup;

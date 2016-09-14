var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');


var StudentCollection = require('../models/students').StudentCollection;
var Group = require('../models/groups').Group;


var GroupSetup = React.createClass({
  getInitialState: function(){
    return {
      studentList: new StudentCollection(),
      kidsGroup: new Group(),
    };
  },
  componentWillMount: function(){
    var self = this;
    this.state.studentList.fetch().done(function(){
      self.forceUpdate();
    });
  },
  onRowSelect: function(row, isSelected){
      console.log(row);
      console.log("selected: " + isSelected)
  },
  onSelectAll: function(isSelected){
      console.log("is select all: " + isSelected);
  },
  onSubmit: function(e){
    e.preventDefault();
    var router = this.props.router;
    var kidsGroup = this.state.kidsGroup;
    var selectGroup = [];
    var user = JSON.parse(localStorage.getItem('user'));
    $("#groupTable input:checkbox:checked").map(function(){
    	var row = $(this).closest('tr');
			var studentItem = $(row).find('.thisStudent').html();
      var schoolItem = $(row).find('.thisSchool').html();
      var firstName1Item = $(row).find('.thisFirstName1').html();
      var lastName1Item = $(row).find('.thisLastName1').html();
      var street1Item = $(row).find('.thisStreet1').html();
      var city1Item = $(row).find('.thisCity1').html();
      var state1Item = $(row).find('.thisState1').html();
      var zip1Item = $(row).find('.thisZip1').html();
      var email1Item = $(row).find('.thisEmail1').html();
      var phone1Item = $(row).find('.thisPhone1').html();
      selectGroup.push([studentItem, schoolItem, firstName1Item, lastName1Item, street1Item, city1Item, state1Item, zip1Item, email1Item, phone1Item]);
    });
    console.log(selectGroup);
    kidsGroup.set('myGroup', selectGroup);
    kidsGroup.setPointer('user', user, '_User');
    kidsGroup.save().done(function(){
      router.navigate('schedules/', {trigger: true});
    });
  },
  render: function(){
    var user = JSON.parse(localStorage.getItem('user'));
    var chooseStudent = this.state.studentList;
    var eachStudent = chooseStudent.map(function(student, index){
      return (
        <tr key={index}>
          <td align="center">
            <input type="checkbox" className="case" name="case" value={index} />
          </td>
          <td className="thisStudent">{student.get('student')}</td>
          <td className="thisSchool">{student.get('school')}</td>
          <td>{student.get('grade')}</td>
          <td>{student.get('gender')}</td>
          <td className="thisFirstName1">{student.get('firstname1')}</td>
          <td className="thisLastName1">{student.get('lastname1')}</td>
          <td className="thisPhone1">{student.get('phone1')}</td>
          <td className="thisEmail1">{student.get('email1')}</td>
          <td className="thisStreet1">{student.get('street1')}</td>
          <td className="thisCity1">{student.get('city1')}</td>
          <td className="thisState1">{student.get('state1')}</td>
          <td className="thisZip1">{student.get('zip1')}</td>
        </tr>
      )
    })
    return (
      <div>
        <div className="col-xs-offset-1 col-xs-10 col-md-offset-2 col-md-8">
          < NavTitle />
          <div><h1 id="page-title">Welcome, {user.firstname1}!</h1></div>
          <div className="sect-sep">
            <p>Now that you’re a Pool Party member, let’s start with creating a Group. The Students you’ll see listed below live within a 2-mile radius of your home. This makes it convenient for both them and you to join together.</p>
          </div>
          <div className="row">
            <div>
              <div className="subtitle"><h2><img src="./images/group.png" className="panel-art"/>Create A Group!</h2></div>
              <div className="panel-body">
                <p>Select from the eligible students shown to form your potential car pool group. Do not select more than 4 potential students; Groups cannot consist of more than 5 members. Students with the name crossed through have already joined a group.</p>
                <p>Once you’ve selected your group, name the group below. Then click the Create button. An email will be sent to each student’s parent(s) informing them of your wish to have them join your car pool. You will be notified once they have confirmed their participation.</p>
              </div>
              <div className="well tableScroll table-responsive">
                <table border="1" className="table table-striped" id="groupTable">
                  <thead>
                    <tr>
                      <th>Select</th>
                      <th>Student</th>
                      <th>School</th>
                      <th>Grade Level</th>
                      <th>Gender</th>
                      <th>Parent Name</th>
                      <th>Parent Last</th>
                      <th>Phone</th>
                      <th>Email</th>
                      <th>Street</th>
                      <th>City</th>
                      <th>State</th>
                      <th>Zip Code</th>
                    </tr>
                  </thead>
                  <tbody>{eachStudent}</tbody>
                </table>
              </div>
            </div>
            <div>
              <button id="submitButton" type="submit" className="btn btn-success btn-sm" onClick={this.onSubmit}>Create Group</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
});

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


module.exports = {
  'GroupSetup': GroupSetup,
};


// var GroupPop = React.createClass({
//   groupShare: function() {
//     window.open('', 'sharer', 'toolbar=0,status=0,width=640,height=480');
//   },
//   render: function(){
//     return (
//       <div>
//         <button id="submitButton" type="submit" className="btn btn-success btn-sm pull-right" onClick={this.groupShare}>Create Group</button>
//       </div>
//     );
//   }
// });
//
// var onRowSelect;
// var onSelectAll;
// var selectRowProp = {
//     mode: "checkbox",
//     clickToSelect: true,
//     bgColor: "#FFC469",
//     onSelect: onRowSelect,
//     onSelectAll: onSelectAll
//   };
//
// var GroupSelect = React.createClass({
//   getInitialState: function(){
//     return {
//       router
//     };
//   },
//   componentWillMount: function(){
//     var self = this;
//   },
//   render: function(){
//     return (
//       <div>
//         <h2>Here’s you Group!</h2>
//         <div>
//           <p>Now that you’ve set up your Group, be sure to confirm the students you selected and give your Group a name. If you wish to change your selection, click on the Edit button below.</p>
//         </div>
//       </div>
//     )
//   }
// });

// <div>
//   <BootstrapTable className="table" id="table" data={data} height="280" selectRow={selectRowProp} striped={true} hover={true} condensed={true}>
//     <TableHeaderColumn dataField="studentName" isKey={true} dataSort={true} className="td-header-group">Students Eligible</TableHeaderColumn>
//     <TableHeaderColumn dataField="studentSchool" dataAlign="center" className="td-header-group">School</TableHeaderColumn>
//     <TableHeaderColumn dataField="studentGrade" dataAlign="center" className="td-header-group">Grade Level</TableHeaderColumn>
//     <TableHeaderColumn dataField="studentGender" dataAlign="center" className="td-header-group">Gender</TableHeaderColumn>
//   </BootstrapTable>
// </div>

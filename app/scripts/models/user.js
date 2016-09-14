var Backbone = require('backbone');
var _ = require('underscore');

var User = Backbone.Model.extend({
  idAttribute: 'objectId',
  urlRoot: "https://d9-dev-server.herokuapp.com/users",
  toJSON: function(){
    var data = _.clone(this.attributes);
    delete data.createdAt;
    delete data.updatedAt;
    return data;
  }
},
  {
  login: function(username, password, callbacks){
    var self = this;
    var loggedInUser = new User();
    var queryString = jQuery.param({'username': username, 'password': password});

    loggedInUser.urlRoot = 'https://d9-dev-server.herokuapp.com/login?' + queryString;
    loggedInUser.fetch().done(function(data){
      localStorage.setItem('user', JSON.stringify(loggedInUser.toJSON()));
      self._setAuthen(data.sessionToken);

      callbacks.success(loggedInUser);
    }).fail(function(error){
      callbacks.fail(loggedInUser, error);
    });
  },
  _setAuthen: function(sessionToken){
    jQuery.ajaxSetup({
      beforeSend: function(xhr){
        xhr.setRequestHeader("X-Parse-Application-Id", "d9-id99");
        xhr.setRequestHeader("X-Parse-REST-API-Key", "d9-rest99");
        xhr.setRequestHeader("X-Parse-Session-Token", sessionToken);
      }
    });
  },

 restore: function(){
   var userInfo = JSON.parse(localStorage.getItem('user'));
   var user = new User(userInfo);
   this._setAuthen(userInfo.sessionToken);
   return user;
 },

 isAuthenticated() {
   return !!localStorage.getItem('user');
 }
});


module.exports = {
  User: User
};

// authenticate(options) {
//   var self = this;
//
//   if(options.username) {
//     jQuery.ajax({
//       url: "https://d9-dev-server.herokuapp.com/classes/D9login",
//       data: {
//         email1: options.email1,
//         password: options.password
//       }
//     }).then(function(response){
//       self.set('currentUser', new User(response));
//
//       jQuery.ajaxSetup({
//         beforeSend: function(xhr){
//           xhr.setRequestHeader("X-Parse-Application-Id", "d9-id99");
//           xhr.setRequestHeader("X-Parse-REST-API-Key", "d9-rest99");
//           xhr.setRequestHeader("X-Parse-Session-Token", response.sessionToken);
//         }
//       });
//
//       localStorage.setItem('parse-session-token', response.sessionToken);
//       self.trigger('authenticationSucceeded');
//     });
//   } else {
//     var user = new User(options);
//     this.set('currentUser', user);
//     this.trigger('authenticationSucceeded');
//     user.fetch();
//   }
// },
// var StudentCollection = Backbone.Collection.extend({
//   model: User,
//   url: 'https://d9-dev-server.herokuapp.com/classes/D9students/',
//   parser: function(serverResponse){
//   return serverResponse.results;
//  }
// });

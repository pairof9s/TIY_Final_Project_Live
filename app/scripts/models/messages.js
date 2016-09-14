var Backbone = require('backbone');

var Message = Backbone.Model.extend({
  defaults: {
    'username': '',
    'message': '',
    'createdAt': ''
  },
  idAttribute: "objectId",
  urlRoot: "https://d9-dev-server.herokuapp.com/classes/Messages"
});

var MessageCollection = Backbone.Collection.extend({
  model: Message,
  url: 'https://d9-dev-server.herokuapp.com/classes/Messages'
});

module.exports = {
  'Message': Message,
  'MessageCollection': MessageCollection,
};

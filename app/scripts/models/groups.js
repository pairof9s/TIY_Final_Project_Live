var Backbone = require('backbone');

var PointerFieldModel = Backbone.Model.extend({
  setPointer: function(field, obj, className){
    this.set(field, {'__type': 'Pointer', 'className': className, 'objectId': obj.objectId});
  }
});

var Group = PointerFieldModel.extend({
  defaults: {
    myGroup: []
  },
  idAttribute: "objectId",
  urlRoot: "https://d9-dev-server.herokuapp.com/classes/D9groups"
});

var GroupCollection = Backbone.Collection.extend({
  model: Group,
  url: "https://d9-dev-server.herokuapp.com/classes/D9groups",
  parse: function(serverResponse){
    return serverResponse.results;
  }
});

module.exports = {
  'Group': Group,
  'GroupCollection': GroupCollection
}

var $ = window.jQuery = require('jquery');

var Backbone = require('backbone');


$.ajaxSetup({
  beforeSend: function(xhr){
    xhr.setRequestHeader("X-Parse-Application-Id", "d9-id99");
    xhr.setRequestHeader("X-Parse-REST-API-Key", "d9-rest99");
  }
});

$.fn.serializeObject = function(){
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};


require('./router');

$(function(){
Backbone.history.start();
});

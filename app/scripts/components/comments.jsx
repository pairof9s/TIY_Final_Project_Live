var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');


var CommentBox = React.createClass({
  handleCommentSubmit: function(comment) {
    var comments = this.state.comments;
    comment.id = Date.now();
    var newComments = comments.concat([comment]);
    this.setState({comments: newComments});
  },
  getInitialState: function() {
    return {comments: []};
  },
  render: function() {
    return (
      <div className="comment-box">
        
        <CommentList comments={this.state.comments} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }
});

var Comment = React.createClass({
  render: function() {
    return (
      <div className="comment">
        <h4 className="comment-author">
          {this.props.author} -
        </h4>
        <span>{this.props.text} </span>
      </div>
    );
  }
});

var CommentList = React.createClass({
  render: function() {
    var commentNodes = this.props.comments.map(function(comment) {
      return (
        <Comment text={comment.text} author={comment.author} key={comment.id}/>
      );
    });
    return (
      <div className="comment-list">
        {commentNodes}
      </div>
    );
  }
});

var CommentForm = React.createClass({
  getInitialState: function() {
    return {author: '', text: ''};
  },
  handleAuthorChange: function(e) {
    this.setState({author: e.target.value});
  },
  handleTextChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var author = this.state.author.trim();
    var text = this.state.text.trim();
    if (!text || !author) {
      return;
    }
    this.props.onCommentSubmit({author: author, text: text});
    this.setState({author: '', text: ''});
  },
  render: function() {
    return (
      <div className="row well col-md-8">
        <form className="comment-form form-group" onSubmit={this.handleSubmit}>
          <input
            className="form-control com-field"
            type="text"
            placeholder="Your name"
            value={this.state.author}
            onChange={this.handleAuthorChange}
          />
          <input
            className="form-control com-field"
            type="text"
            placeholder="Say something..."
            value={this.state.text}
            onChange={this.handleTextChange}
          />
        <input type="submit" value="Post" className="btn btn-success btn-xs" />
        </form>
      </div>
    );
  }
});

module.exports = {
  CommentBox
};

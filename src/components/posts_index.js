import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchPosts, deletePost } from "../actions";

class PostsIndex extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  onDeleteClick() {
    const { id } = this.props.match.params;

    this.props.deletePost(id, () => {
      this.props.history.push("/");
    });
  }

  renderPosts() {
    return _.map(this.props.posts, post => {
      return (
        <div key={post.id}>
        <tr>
          <Link to={`/posts/${post.id}`}>
            {post.title}
          </Link>
        </tr>
        </div>

      );
    });
  }

  render() {
    return (
      <div>
        <div className="text-xs-right">
        <br />
          <Link className="btn btn-primary" to="/posts/new">
            Add a Post
          </Link>
        </div>
        <br />
        <h3>Sicart Story Posts</h3>
        <br />
        <table class="u-full-width">
        <tbody>
          {this.renderPosts()}
          </tbody>
          </table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { posts: state.posts };
}

export default connect(mapStateToProps, { fetchPosts })(PostsIndex);

import React, { Component } from "react";

import { Mutation } from "react-apollo";
import gql from "graphql-tag";

import { FEED_QUERY } from "./LinkList";
import { LINKS_PER_PAGE } from "../constants";

const POST_MUTATION = gql`
  mutation PostMutation($description: String!, $url: String!) {
    postLink(description: $description, url: $url) {
      id
      createdAt
      url
      description
    }
  }
`;

class CreateLink extends Component {
  state = {
    description: "",
    url: ""
  };

  _handleUpdate = (store, { data: { postLink } }) => {
    const first = LINKS_PER_PAGE;
    const skip = 0;
    const orderBy = "createdAt_DESC";
    const data = store.readQuery({
      query: FEED_QUERY,
      variables: {
        first,
        skip,
        orderBy
      }
    });
    data.feed.links.unshift(postLink);
    store.writeQuery({
      query: FEED_QUERY,
      data,
      variables: {
        first,
        skip,
        orderBy
      }
    });
  };

  render() {
    const { description, url } = this.state;
    return (
      <>
        <div className="flex flex-column mt3">
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            name="description"
            className="mb2"
            value={description}
            onChange={e => this.setState({ description: e.target.value })}
            placeholder="A description for the link"
          />
          <label htmlFor="url">URL:</label>
          <input
            type="text"
            name="url"
            className="mb2"
            value={url}
            onChange={e => this.setState({ url: e.target.value })}
            placeholder="The URL for the link"
          />
        </div>
        <Mutation
          mutation={POST_MUTATION}
          variables={{ description, url }}
          onCompleted={() => this.props.history.push("/new/1")}
          update={this._handleUpdate}
        >
          {postMutation => <button onClick={postMutation}>submit</button>}
        </Mutation>
      </>
    );
  }
}

export default CreateLink;

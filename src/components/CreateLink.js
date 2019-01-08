import React, { Component } from "react";

import { Mutation } from "react-apollo";
import gql from "graphql-tag";

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

  render() {
    const { description, url } = this.state;
    return (
      <div>
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
          onCompleted={() => this.props.history.push("/")}
        >
          {postMutation => (
            <button onClick={postMutation}>
              <span role="img" aria-label="check">
                ✅
              </span>
              {` Submit `}
              <span role="img" aria-label="check">
                ✅
              </span>
            </button>
          )}
        </Mutation>
      </div>
    );
  }
}

export default CreateLink;

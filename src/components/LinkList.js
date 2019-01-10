// React dependencies
import React, { Component } from "react";
import Link from "./Link";

// GraphQL dependencies
import { Query } from "react-apollo";
import gql from "graphql-tag";

// GQL Calls
export const FEED_QUERY = gql`
  {
    feed {
      links {
        id
        createdAt
        url
        description
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`;

const NEW_LINKS_SUBSCRIPTION = gql`
  subscription {
    newLink {
      id
      url
      description
      createdAt
      postedBy {
        id
        name
      }
      votes {
        id
        user {
          id
        }
      }
    }
  }
`;

class LinkList extends Component {
  _updateCacheAfterVote = (store, createVote, linkId) => {
    // Read the cached data for FEED_QUERY from the store
    const data = store.readQuery({ query: FEED_QUERY });

    // Get the link the user just voted on, and modify the votes on them
    const votedLink = data.feed.links.find(link => link.id === linkId);
    votedLink.votes = createVote.link.votes;

    // Write the new vote quantity back to the store as FEED_QUERY
    store.writeQuery({ query: FEED_QUERY, data });
  };

  _subscribeToNewLinks = async subscribeToMore => {
    subscribeToMore({
      document: NEW_LINKS_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) return prev;
        const newLink = subscriptionData.data.newLink;
        // Modify the return data to add the newLink
        return Object.assign({}, prev, {
          feed: {
            links: [...prev.feed.links, newLink],
            count: prev.feed.links.length + 1,
            __typename: prev.feed.__typename
          }
        });
      }
    });
  };

  render() {
    return (
      <Query query={FEED_QUERY}>
        {({ loading, error, data, subscribeToMore }) => {
          if (loading) {
            return (
              <div>
                <span role="img" aria-label="flexing">
                  💪
                </span>
                Fetching...
                <span role="img" aria-label="flexing">
                  💪
                </span>
              </div>
            );
          }
          if (error) {
            console.error(error);
            return (
              <div>
                <span role="img" aria-label="nope">
                  ❌
                </span>
                An error has occured!
                <span role="img" aria-label="nope">
                  ❌
                </span>
              </div>
            );
          }

          this._subscribeToNewLinks(subscribeToMore);

          return (
            <div>
              {data.feed.links.map((link, i) => (
                <Link
                  key={link.id}
                  link={link}
                  index={i}
                  updateStoreAfterVote={this._updateCacheAfterVote}
                />
              ))}
            </div>
          );
        }}
      </Query>
    );
  }
}

export default LinkList;

// React dependencies
import React, { Component } from "react";
import Link from "./Link";

// GraphQL dependencies
import { Query } from "react-apollo";
import gql from "graphql-tag";

import { LINKS_PER_PAGE } from "../constants";

// GQL Calls
export const FEED_QUERY = gql`
  query FeedQuery($first: Int, $skip: Int, $orderBy: LinkOrderByInput) {
    feed(first: $first, skip: $skip, orderBy: $orderBy) {
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

const NEW_VOTES_SUBSCRIPTION = gql`
  subscription {
    newVote {
      id
      link {
        id
        url
        description
        createdAtpostedBy {
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
      user {
        id
      }
    }
  }
`;

class LinkList extends Component {
  // Auto update the your own votes live
  _updateCacheAfterVote = (store, createVote, linkId) => {
    // Read the cached data for FEED_QUERY from the store
    const data = store.readQuery({ query: FEED_QUERY });

    // Get the link the user just voted on, and modify the votes on them
    const votedLink = data.feed.links.find(link => link.id === linkId);
    votedLink.votes = createVote.link.votes;

    // Write the new vote quantity back to the store as FEED_QUERY
    store.writeQuery({ query: FEED_QUERY, data });
  };

  // Audo update link addition live
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

  // Auto update other people's votes live
  _subscribeToNewVotes = subscribeToMore => {
    subscribeToMore({
      document: NEW_VOTES_SUBSCRIPTION
    });
  };

  // Implementing pagination
  _getQueryVariables = () => {
    const isNewPage = this.props.location.pathname.includes("new");
    const page = parseInt(this.props.match.params.page, 10);

    const skip = isNewPage ? (page - 1) * LINKS_PER_PAGE : 0;
    const first = isNewPage ? LINKS_PER_PAGE : 100;
    const orderBy = isNewPage ? "createdAt_DESC" : null;
    return { first, skip, orderBy };
  };

  render() {
    return (
      <Query query={FEED_QUERY} variables={this._getQueryVariables()}>
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
          this._subscribeToNewVotes(subscribeToMore);

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

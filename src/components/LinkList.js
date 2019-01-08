// React dependencies
import React from "react";
import Link from "./Link";

// GraphQL dependencies
import { Query } from "react-apollo";
import gql from "graphql-tag";

const FEED_QUERY = gql`
  {
    feed {
      links {
        id
        createdAt
        url
        description
      }
    }
  }
`;

const LinkList = () => (
  <Query query={FEED_QUERY}>
    {({ loading, error, data }) => {
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

      return (
        <div>
          {data.feed.links.map(link => (
            <Link key={link.id} link={link} />
          ))}
        </div>
      );
    }}
  </Query>
);

export default LinkList;

# How to GraphQL

This directory contains notes pertaining to different courses provided by [How To GraphQL](https://www.howtographql.com/). Each tutorial/course has its own directory, but there are some fundamental basics to developing with GraphQL (regardless of whether or not the tech is front-end or back-end).

## What is GraphQL

It may sound confusing, but GraphQL is actually just a new type of API standard. It was invented and open-sourced by Facebook. It functions similarly to a RESTful API, however it only exposes one  endpoint and responds to declarative data fetching via queries.

Lots of words there, but it's actually not too complicated, and best understood through an example.

Say we had a link-sharing website with multiple users, and their friends (and their links). If we wanted a user's name, their top 3 friends and top 3 links, instictively we'd just hit up each endpoint for all their data. This would get our ENTIRE user object, their ENTIRE friends list, and their ENTIRE link history.

This is a common problem with REST endpoints: overfetching/underfetching data. We can solve this through a refactoring of the API, but this takes time, and can get messy quick.

Instead we use GraphQL.

GraphQL will let the front-end developer outline exactly the data they'd like from the server as a _query_. This query designs the entire JSON data object, and tells the endpoint to only provide this explicit data. A pseudo-code query would look like this:

```graphql
query {
  User(id: "11619258") {
    name
    links(last: 3) {
      title
    }
    friends(last: 3) {
      name
    }
  }
}
```
and bam! We'd only get the info we need, not the id's of the friends, or the number of clicks on each link. We've trimmed the fluff.

## But Why?

Well in today's internet era, we want to make it as easy as possible for users to access content, in whatever way possible. In this case, we want to reduce the load times, and data consumption on the client side, but not have to refactor our API every time we do so. 

This adds a certain type of flexability about the application whereby the server team and client team agree on a `schema` and the rest is dynamic. The front-end teams can outline exactly the type of data they need to remodel the UI without consulting the back-end teams. This development cycle will lead to faster turn around times and rapid prototyping, easily.
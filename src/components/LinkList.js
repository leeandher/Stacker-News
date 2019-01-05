import React from "react";
import Link from "./Link";

const LinkList = () => {
  const linksToRender = [
    {
      id: "1",
      description:
        "Prisma replaces traditional ORMs and makes it easy to build GraphQL servers 😎",
      url: "https://www.prisma.io"
    },
    {
      id: "2",
      description: "The best GraphQL client",
      url: "https://www.apollographql.com/docs/react/"
    }
  ];
  return (
    <div>
      {linksToRender.map(link => (
        <Link key={link.id} link={link} />
      ))}
    </div>
  );
};

export default LinkList;

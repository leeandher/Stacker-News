import React from "react";

const Lost = ({
  match: {
    params: { other }
  }
}) => (
  <p>
    Why did you come here? <b>{other}/</b> doesn't exist.
  </p>
);

export default Lost;

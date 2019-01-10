import React from "react";

const Lost = ({
  match: {
    params: { other }
  }
}) => (
  <p>
    Why did you come here? <b>{other}/</b> doesn't exist. Testing
  </p>
);

export default Lost;

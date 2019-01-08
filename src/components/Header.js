import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

const Header = () => (
  <header className="flex pal justify-between nowrap orange">
    <div className="flex flex-fixed black">
      <div className="fw7 mr1">Stacker News</div>
      <Link to="/" className="ml1 no-underline black">
        new
      </Link>
      <div className="ml1">|</div>
      <Link to="/create" className="ml1 no-underline black">
        submit
      </Link>
    </div>
  </header>
);

export default withRouter(Header);

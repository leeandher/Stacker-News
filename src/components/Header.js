import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

import { AUTH_TOKEN } from "../constants";

const Header = ({ history }) => {
  const authToken = localStorage.getItem(AUTH_TOKEN);
  return (
    <header className="flex pa1 justify-between nowrap orange">
      <div className="flex flex-fixed black">
        <img src="y18.gif" alt="Stacker News Logo" className="icon" />
        <div className="fw7 mr1">Stacker News</div>
        <Link to="/" className="ml1 no-underline black">
          new
        </Link>
        <div className="ml1">|</div>
        <Link to="/top" className="ml1 no-underline black">
          top
        </Link>
        <div className="ml1">|</div>
        <Link to="/search" className="ml1 no-underline black">
          search
        </Link>
        <div className="ml1">|</div>
        <Link to="/create" className="ml1 no-underline black">
          submit
        </Link>
      </div>
      <div className="flex flex-fixed">
        {authToken ? (
          <div
            className="ml1 pointer black"
            onClick={() => {
              localStorage.removeItem(AUTH_TOKEN);
              history.push("/..");
            }}
          >
            logout
          </div>
        ) : (
          <Link to="/login" className="ml1 no-underline black">
            login
          </Link>
        )}
      </div>
    </header>
  );
};
export default withRouter(Header);

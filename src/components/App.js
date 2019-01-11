import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Header from "./Header";
import LinkList from "./LinkList";
import CreateLink from "./CreateLink";
import Login from "./Login";
import Search from "./Search";
import Lost from "./Lost";

class App extends Component {
  render() {
    return (
      <main className="center basis">
        <Header />
        <div className="ph3 pv1 background-gray">
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/new/1" />} />
            <Route exact path="/create" component={CreateLink} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/top" component={LinkList} />
            <Route exact path="/new/:page" component={LinkList} />
            <Route exact path="/:other" component={Lost} />
          </Switch>
        </div>
        <footer>
          Lovingly based on:{" "}
          <a href="https://news.ycombinator.com">HackerNews</a>
        </footer>
      </main>
    );
  }
}

export default App;

import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DetailedProjectPage from "./pages/DetailedProjectPage";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProjectListingPage from "./pages/ProjectListingPage";
import UserProfilePage from "./pages/UserProfilePage";
import UserTasksPage from "./pages/UserTasksPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <LoginPage />
        </Route>
        <Route path='/home'>
          <HomePage />
        </Route>
        <Route exact path='/projects'>
          <ProjectListingPage />
        </Route>
        <Route path='/projects/id/:id'>
          <DetailedProjectPage />
        </Route>
        <Route path='/user-profile'>
          <UserProfilePage />
        </Route>
        <Route path='/tasks'>
          <UserTasksPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
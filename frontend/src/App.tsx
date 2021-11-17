import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import UserProjectsContextProvider from "./components/contexts/UserProjectsContextProvider";
import DetailedProjectPageWrapper from "./pages/DetailedProjectPageWrapper";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProjectListingPage from "./pages/ProjectListingPage";
import UserProfilePage from "./pages/UserProfilePage";
import UserTasksPage from "./pages/UserTasksPage";

function App() {
  return (
    <UserProjectsContextProvider>
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
            <DetailedProjectPageWrapper />
          </Route>
          <Route path='/user-profile'>
            <UserProfilePage />
          </Route>
          <Route path='/tasks'>
            <UserTasksPage />
          </Route>
        </Switch>
      </Router>
    </UserProjectsContextProvider>
  );
}

export default App;

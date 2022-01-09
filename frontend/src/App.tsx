import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import UserAuthenticationContextProvider from "./contexts/UserAuthenticationContextProvider";
import UserProjectsContextProvider from "./contexts/UserProjectsContextProvider";
import DetailedProjectPageWrapper from "./pages/DetailedProjectPageWrapper";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProjectListingPage from "./pages/ProjectListingPage";

function App() {
  return (
    <UserAuthenticationContextProvider>
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
            <Route path='*'>
              <NotFoundPage />
            </Route>
          </Switch>
        </Router>
      </UserProjectsContextProvider>
    </UserAuthenticationContextProvider>
  );
}

export default App;

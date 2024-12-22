import { JSX } from "react";
import { BrowserRouter, Route, Routes } from "react-router";

import UserProjectsContextProvider from "./contexts/UserProjectsContextProvider";
import DetailedProjectPageWrapper from "./pages/DetailedProjectPageWrapper";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProjectListingPage from "./pages/ProjectListingPage";
import ProtectedRoute from "./pages/ProtectedRoute";
import UserSignUpPage from "./pages/UserSignupPage";

function App(): JSX.Element {
  return (
    <UserProjectsContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/sign-up" element={<UserSignUpPage />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/projects"
            element={
              <ProtectedRoute>
                <ProjectListingPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/projects/id/:id"
            element={
              <ProtectedRoute>
                <DetailedProjectPageWrapper />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </UserProjectsContextProvider>
  );
}

export default App;

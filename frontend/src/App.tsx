import { BrowserRouter, Route, Routes } from "react-router";

import UserProjectsContextProvider from "./contexts/UserProjectsContextProvider";
import DetailedProjectPageWrapper from "./pages/DetailedProjectPageWrapper";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProjectListingPage from "./pages/ProjectListingPage";
import UserSignUpPage from "./pages/UserSignupPage";

function App() {
  return (
    <UserProjectsContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/sign-up" element={<UserSignUpPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/projects" element={<ProjectListingPage />} />
          <Route path="/projects/id/:id" element={<DetailedProjectPageWrapper />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </UserProjectsContextProvider>
  );
}

export default App;

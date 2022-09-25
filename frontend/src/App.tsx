import { BrowserRouter, Routes, Route } from "react-router-dom";

import UserProjectsContextProvider from "./contexts/UserProjectsContextProvider";
import DetailedProjectPageWrapper from "./pages/DetailedProjectPageWrapper";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProjectListingPage from "./pages/ProjectListingPage";

function App() {
  return (
    <UserProjectsContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/projects' element={<ProjectListingPage />} />
          <Route path='/projects/id/:id' element={<DetailedProjectPageWrapper />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </UserProjectsContextProvider>
  );
}

export default App;

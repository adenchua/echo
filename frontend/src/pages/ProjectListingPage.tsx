import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Hidden from "@mui/material/Hidden";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { useContext, useState } from "react";
import { Navigate, Link as RouterLink } from "react-router-dom";

import CreateProjectButtonWithDialog from "../components/CreateProjectButtonWithDialog";
import ProjectListingItem from "../components/ProjectListingItem";
import Grow from "../components/common/Grow";
import PageLayoutWrapper from "../components/common/PageLayoutWrapper";
import SearchBar from "../components/common/SearchBar";
import { UserProjectsContext } from "../contexts/UserProjectsContextProvider";
import { useLocalStorage } from "../hooks/useLocalStorage";
import Project from "../types/Project";
import { LOCAL_STORAGE_UID_KEY } from "../utils/constants";
import { matchString } from "../utils/stringUtils";

const ProjectListingPage = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const { projects } = useContext(UserProjectsContext);
  const { storedValue: loggedInUserId } = useLocalStorage(LOCAL_STORAGE_UID_KEY, "");

  if (!loggedInUserId) {
    return <Navigate to="/" />;
  }

  const renderTitleHeaders = () => {
    return (
      <Box mb={1} p={1} display="flex" alignItems="center" gap={8}>
        <Typography variant="body2" sx={{ width: "242px" }}>
          Project
        </Typography>
        <Typography variant="body2" sx={{ width: "64px" }} noWrap>
          Sprint
        </Typography>
        <Hidden smDown>
          <Typography variant="body2" sx={{ width: "160px" }}>
            Current Tasks
          </Typography>
          <Typography variant="body2">Members</Typography>
        </Hidden>
      </Box>
    );
  };

  const renderNoProjectsMessage = () => (
    <Typography variant="body2" sx={{ color: "GrayText", fontStyle: "italic" }}>
      There are no projects listed.
    </Typography>
  );

  return (
    <PageLayoutWrapper>
      <Typography variant="h5" paragraph>
        Projects
      </Typography>
      <Box display="flex" gap={2}>
        <CreateProjectButtonWithDialog />
        <SearchBar
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search projects"
        />
      </Box>
      <Divider sx={{ mt: 3, mb: 3 }} />
      {projects.length > 0 && renderTitleHeaders()}
      {projects.length === 0 && renderNoProjectsMessage()}
      {projects.map((project: Project) => {
        if (matchString(searchInput, project.title)) {
          return (
            <Link
              component={RouterLink}
              to={`/projects/id/${project._id}?tab=overview`}
              key={project._id}
              underline="none"
            >
              <Grow timeout={400}>
                <div>
                  <ProjectListingItem project={project} />
                </div>
              </Grow>
            </Link>
          );
        }
        return null;
      })}
    </PageLayoutWrapper>
  );
};

export default ProjectListingPage;

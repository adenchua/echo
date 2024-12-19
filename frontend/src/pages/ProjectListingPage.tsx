import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router";

import CreateProjectButtonWithDialog from "../components/CreateProjectButtonWithDialog";
import ProjectListingItem from "../components/ProjectListingItem";
import Grow from "../components/common/Grow";
import Link from "../components/common/Link";
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
  const navigate = useNavigate();

  if (!loggedInUserId) {
    return <Navigate to="/" />;
  }

  const renderTitleHeaders = () => {
    return (
      <Box mb={1} p={1} display="flex" alignItems="center" gap={8}>
        <Typography sx={{ width: "242px" }}>Project</Typography>
        <Typography sx={{ width: "64px" }} noWrap>
          Sprint
        </Typography>
        <Typography sx={{ width: "160px" }}>Current Tasks</Typography>
        <Typography>Members</Typography>
      </Box>
    );
  };

  const renderNoProjectsMessage = () => <Typography>There are no projects listed</Typography>;

  return (
    <PageLayoutWrapper>
      <Typography variant="h4" mb={2}>
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
            <Grow timeout={400}>
              <div key={project._id}>
                <Link onClick={() => navigate(`/projects/id/${project._id}?tab=overview`)}>
                  <ProjectListingItem project={project} />
                </Link>
              </div>
            </Grow>
          );
        }
        return null;
      })}
    </PageLayoutWrapper>
  );
};

export default ProjectListingPage;

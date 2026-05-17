import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { JSX, use, useState } from "react";

import { EpicsContext } from "../../contexts/EpicsContextProvider";
import Project from "../../types/Project";
import EpicCreationForm from "../EpicCreationForm";
import EpicSummaryAccordion from "../EpicSummaryAccordion";
import Button from "../common/Button";

interface TeamObjectivesTabProps {
  project: Project;
}

const TeamObjectivesTab = (props: TeamObjectivesTabProps): JSX.Element => {
  const [showCreationForm, setShowCreationForm] = useState<boolean>(false);
  const { epics } = use(EpicsContext);

  const { project } = props;
  const { _id: projectId } = project;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" component="p" sx={{ mb: 2 }}>
        Epics
      </Typography>
      <Typography sx={{ maxWidth: 640, mb: 4, color: "text.secondary" }}>
        Epics represent a collection of user stories that share a broader strategic objective. They
        can be used to organize tasks in the project&apos;s backlog
      </Typography>
      <Button onClick={() => setShowCreationForm(true)}>Add Epic</Button>
      <Box sx={{ mb: 3 }} />
      {showCreationForm && (
        <EpicCreationForm onClose={() => setShowCreationForm(false)} projectId={projectId} />
      )}
      {epics.length === 0 && (
        <Typography sx={{ color: "text.secondary", fontStyle: "italic" }}>
          There are no epics created.
        </Typography>
      )}
      <div>{epics && epics.map((epic) => <EpicSummaryAccordion key={epic._id} epic={epic} />)}</div>
    </Box>
  );
};

export default TeamObjectivesTab;

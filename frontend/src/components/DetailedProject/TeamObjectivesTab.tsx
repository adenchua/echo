import AddIcon from "@mui/icons-material/AddOutlined";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useContext, useState } from "react";

import { EpicsContext } from "../../contexts/EpicsContextProvider";
import Project from "../../types/Project";
import EpicCreationForm from "../EpicCreationForm";
import EpicSummaryAccordion from "../EpicSummaryAccordion";
import CTAButton from "../common/CTAButton";

interface TeamObjectivesTabProps {
  project: Project;
}

const TeamObjectivesTab = (props: TeamObjectivesTabProps) => {
  const [showCreationForm, setShowCreationForm] = useState<boolean>(false);
  const { epics } = useContext(EpicsContext);

  const { project } = props;
  const { _id: projectId } = project;

  return (
    <Box p={3}>
      <Typography variant="h5" paragraph>
        Epics
      </Typography>
      <Typography mb={4} sx={{ maxWidth: 640 }} color="textSecondary">
        Epics represent a collection of user stories that share a broader strategic objective. They
        can be used to organize tasks in the project's backlog
      </Typography>
      <CTAButton icon={<AddIcon />} onClick={() => setShowCreationForm(true)} text="Add Epic" />
      <Box mb={3} />
      {showCreationForm && (
        <EpicCreationForm onClose={() => setShowCreationForm(false)} projectId={projectId} />
      )}
      {epics.length === 0 && (
        <Typography variant="body2" color="textSecondary" fontStyle="italic">
          There are no epics created.
        </Typography>
      )}
      <div>{epics && epics.map((epic) => <EpicSummaryAccordion key={epic._id} epic={epic} />)}</div>
    </Box>
  );
};

export default TeamObjectivesTab;

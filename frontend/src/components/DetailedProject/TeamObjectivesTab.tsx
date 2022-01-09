import React, { useContext, useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/AddOutlined";

import ProjectInterface from "../../types/ProjectInterface";
import EpicSummaryAccordion from "../EpicSummaryAccordion";
import { EpicsContext } from "../../contexts/EpicsContextProvider";
import EpicCreationForm from "../EpicCreationForm";

interface TeamObjectivesTabProps {
  project: ProjectInterface;
}

const TeamObjectivesTab = (props: TeamObjectivesTabProps): JSX.Element => {
  const [showCreationForm, setShowCreationForm] = useState<boolean>(false);
  const { epics } = useContext(EpicsContext);

  const { project } = props;
  const { _id: projectId } = project;

  return (
    <Box p={3}>
      <Typography variant='h5' paragraph>
        Team Objectives
      </Typography>
      <Button variant='outlined' startIcon={<AddIcon />} sx={{ mb: 3 }} onClick={() => setShowCreationForm(true)}>
        Add Objective
      </Button>
      {showCreationForm && <EpicCreationForm onClose={() => setShowCreationForm(false)} projectId={projectId} />}
      {epics.length === 0 && (
        <Typography variant='body2' color='textSecondary' fontStyle='italic'>
          There are no objectives created.
        </Typography>
      )}
      <div>{epics && epics.map((epic) => <EpicSummaryAccordion key={epic._id} epic={epic} />)}</div>
    </Box>
  );
};

export default TeamObjectivesTab;

import React, { useContext } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/AddOutlined";

import ProjectInterface from "../../types/ProjectInterface";

import EpicSummaryAccordion from "../EpicSummaryAccordion";
import { EpicsContext } from "../contexts/EpicsContextProvider";

interface TeamObjectivesTabProps {
  project: ProjectInterface;
}

const TeamObjectivesTab = (props: TeamObjectivesTabProps): JSX.Element => {
  const { epics } = useContext(EpicsContext);

  return (
    <div>
      <Typography variant='h5' paragraph>
        Team Objectives
      </Typography>
      <Button variant='outlined' startIcon={<AddIcon />} sx={{ mb: 3 }}>
        Add Objective
      </Button>
      {epics.length === 0 && (
        <Typography variant='body2' color='textSecondary' fontStyle='italic'>
          There are no objectives created.
        </Typography>
      )}
      <div>{epics && epics.map((epic) => <EpicSummaryAccordion key={epic._id} epic={epic} />)}</div>
    </div>
  );
};

export default TeamObjectivesTab;

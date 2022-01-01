import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/AddOutlined";

import ProjectInterface from "../../types/ProjectInterface";
import EpicInterface from "../../types/EpicInterface";
import fetchEpics from "../../api/epics/fetchEpics";
import EpicSummaryAccordion from "../EpicSummaryAccordion";

interface TeamObjectivesTabProps {
  project: ProjectInterface;
}

const TeamObjectivesTab = (props: TeamObjectivesTabProps): JSX.Element => {
  const [epics, setEpics] = useState<EpicInterface[]>([]);
  const { project } = props;
  const { epicIds } = project;

  useEffect(() => {
    const getEpics = async (): Promise<void> => {
      try {
        const response = await fetchEpics(epicIds);
        setEpics(response);
      } catch (error) {
        // do nothing
      }
    };

    getEpics();
  }, [epicIds]);

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
      <div>
        <EpicSummaryAccordion />
        <EpicSummaryAccordion />
        <EpicSummaryAccordion />
      </div>
    </div>
  );
};

export default TeamObjectivesTab;

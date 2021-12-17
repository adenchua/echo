import React from 'react';
import TaskIcon from '@mui/icons-material/TaskOutlined';
import BugIcon from '@mui/icons-material/BugReportOutlined';
import UserStoryIcon from '@mui/icons-material/HistoryEduOutlined';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import Tooltip from '@mui/material/Tooltip';

import { StoryType } from '../types/StoryInterface';

interface FormTicketTypeToggleButtonsProps {
  value: StoryType;
  onChangeHandler: any;
}

const FormTicketTypeToggleButtons = (props: FormTicketTypeToggleButtonsProps): JSX.Element => {
  const { value, onChangeHandler } = props;

  return (
    <ToggleButtonGroup value={value} exclusive onChange={onChangeHandler} size="small">
      <ToggleButton value={'task'} color="secondary">
        <Tooltip title={'Task'} disableInteractive>
          <TaskIcon fontSize="small" />
        </Tooltip>
      </ToggleButton>
      <ToggleButton value={'story'} color="info">
        <Tooltip title={'User Story'} disableInteractive>
          <UserStoryIcon fontSize="small" />
        </Tooltip>
      </ToggleButton>
      <ToggleButton value={'bug'} color="error">
        <Tooltip title={'Bug'} disableInteractive>
          <BugIcon fontSize="small" />
        </Tooltip>
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default FormTicketTypeToggleButtons;

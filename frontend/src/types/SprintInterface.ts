interface SprintInterface {
  _id: string;
  number: number;
  startDate: string;
  endDate: string;
  incompleteStoryIds: string[];
  completedStoryIds: string[];
  hasEnded: boolean;
}

export default SprintInterface;

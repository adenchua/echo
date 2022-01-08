interface SprintInterface {
  _id: string;
  number: number;
  startDate: string;
  endDate: string;
  incompleteTicketIds: string[];
  completedTicketIds: string[];
  hasEnded: boolean;
}

export default SprintInterface;

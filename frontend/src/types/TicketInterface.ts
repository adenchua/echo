export type StatusType = "todo" | "progress" | "review" | "completed" | "stuck" | "hold";

export type PriorityType = "low" | "medium" | "high" | "highest";

export type TicketType = "story" | "task" | "bug";

export type StoryPointsType = 1 | 2 | 3 | 5 | 8;

export type TicketUpdateFieldsType = {
  title?: string;
  description?: string;
  status?: StatusType;
  priority?: PriorityType;
  type?: TicketType;
  dueDate?: string | null;
  isInSprint?: boolean;
  assigneeId?: string | null;
  epicId?: string | null;
  storyPoints?: StoryPointsType;
};
interface TicketInterface {
  _id: string;
  title: string;
  description: string;
  assigneeId: string;
  createdDate: string;
  dueDate: string;
  status: StatusType;
  priority: PriorityType;
  type: TicketType;
  subtaskIds: string[];
  isInSprint: boolean;
  ticketNumber: number;
  epicId: string;
  storyPoints: StoryPointsType;
}

export default TicketInterface;

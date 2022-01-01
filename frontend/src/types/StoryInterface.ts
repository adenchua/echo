export type StatusType = "todo" | "progress" | "review" | "completed" | "stuck" | "hold";

export type PriorityType = "low" | "medium" | "high" | "highest";

export type StoryType = "story" | "task" | "bug";

export type TicketUpdateFieldsType = {
  title?: string;
  description?: string;
  status?: StatusType;
  priority?: PriorityType;
  type?: StoryType;
  dueDate?: string | null;
  isInSprint?: boolean;
  assigneeId?: string | null;
  epicId?: string | null;
};
interface StoryInterface {
  _id: string;
  title: string;
  description: string;
  assigneeId: string;
  createdDate: string;
  dueDate: string;
  status: StatusType;
  priority: PriorityType;
  type: StoryType;
  subtaskIds: string[];
  isInSprint: boolean;
  ticketNumber: number;
  epicId: string;
}

export default StoryInterface;

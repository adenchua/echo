export type StatusType = "todo" | "progress" | "review" | "completed" | "stuck" | "hold";
export type PriorityType = "low" | "medium" | "high" | "highest";
export type StoryType = "story" | "task" | "bug";
export type TicketUpdateFieldsType = {
  title?: string;
  description?: string;
  status?: StatusType;
  priority?: PriorityType;
  type?: StoryType;
  dueDate?: string;
  isInSprint?: boolean;
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
}

export default StoryInterface;

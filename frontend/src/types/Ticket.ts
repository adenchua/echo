export type TicketStatus = "todo" | "progress" | "review" | "completed" | "stuck" | "hold";

export type TicketPriority = "low" | "medium" | "high" | "highest";

export type TicketType = "story" | "task" | "bug";

export type StoryPoints = 1 | 2 | 3 | 5 | 8;

export type TicketUpdateFields = {
  title?: string;
  description?: string;
  status?: TicketStatus;
  priority?: TicketPriority;
  type?: TicketType;
  dueDate?: string | null;
  isInSprint?: boolean;
  assigneeId?: string | null;
  epicId?: string | null;
  storyPoints?: StoryPoints;
};

interface Ticket {
  _id: string;
  title: string;
  description: string;
  assigneeId: string;
  createdDate: string;
  dueDate: string;
  status: TicketStatus;
  priority: TicketPriority;
  type: TicketType;
  subtaskIds: string[];
  isInSprint: boolean;
  ticketNumber: number;
  epicId: string;
  storyPoints: StoryPoints;
}

export default Ticket;

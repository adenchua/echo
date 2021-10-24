interface StoryInterface {
  title: string;
  description: string;
  assignees: string[];
  createdDate: string;
  dueDate: string;
  status: "todo" | "progress" | "review" | "completed" | "stuck" | "hold";
  weight: number;
  priority: "low" | "medium" | "high" | "highest";
  type: "story" | "task" | "bug";
  subtasks: string[];
}

export default StoryInterface;

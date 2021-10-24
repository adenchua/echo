import StoryInterface from "./StoryInterface";

interface SprintInterface {
  number: number;
  startDate: string;
  endDate: string;
  incompleteStories: StoryInterface[];
  completedStories: StoryInterface[];
  hasEnded: boolean;
}

export default SprintInterface;

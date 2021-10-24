import SprintInterface from "./SprintInterface";

interface ProjectInterface {
  title: string;
  description: string;
  announcement: string;
  type: ProjectTypeInterface;
  admins: string[];
  members: string[];
  createdDate: string;
  epics: string[];
  backlog: string[];
  sprints: SprintInterface[];
  picture: number;
}

type ProjectTypeInterface = "Software Development" | "Exploratory Data Analysis";

export default ProjectInterface;

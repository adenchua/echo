interface ProjectInterface {
  _id: string;
  title: string;
  description: string;
  announcement: string;
  type: ProjectTypeInterface;
  adminIds: string[];
  memberIds: string[];
  createdDate: string;
  epicIds: string[];
  backlogIds: string[];
  sprintIds: string[];
  picture: number;
}

export type ProjectUpdateFieldsType = {
  title?: string;
  description?: string;
};

type ProjectTypeInterface = "Software Development" | "Exploratory Data Analysis";

export default ProjectInterface;

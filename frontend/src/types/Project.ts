interface Project {
  _id: string;
  title: string;
  description: string;
  announcement: string;
  type: ProjectType;
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

type ProjectType = "Software Development" | "Exploratory Data Analysis";

export default Project;

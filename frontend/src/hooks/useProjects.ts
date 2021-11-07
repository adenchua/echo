import { useState, useEffect } from "react";
import createProject from "../api/projects/createProject";

import fetchAllProjects from "../api/projects/fetchAllProjects";
import ProjectInterface from "../types/ProjectInterface";

const useProjects = () => {
  const [projects, setProjects] = useState<ProjectInterface[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    const getProjects = async () => {
      try {
        setIsLoading(true);
        const projectsResponse = await fetchAllProjects();
        if (isMounted) {
          setProjects(projectsResponse);
          setIsLoading(false);
        }
      } catch (error) {
        alert("Something went wrong. Please try again later.");
      }
    };

    getProjects();

    return () => {
      isMounted = false; // prevent memory leak
    };
  }, []);

  const handleAddProject = async (title: string, adminId: string, type: string): Promise<void> => {
    try {
      const newProject = await createProject(title, adminId, type);
      setProjects((prevState) => [...prevState, newProject]);
    } catch (error) {
      throw new Error("Failed to create project");
    }
  };

  return { projects, isLoading, handleAddProject };
};

export default useProjects;

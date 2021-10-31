import React from "react";

import ProjectInterface from "../../types/ProjectInterface";

interface ProductBacklogTabProps {
  project: ProjectInterface;
}

const ProductBacklogTab = (props: ProductBacklogTabProps): JSX.Element => {
  return <p>product backlog</p>;
};

export default ProductBacklogTab;

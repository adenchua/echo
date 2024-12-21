import LinearProgress from "@mui/material/LinearProgress";
import { JSX } from "react";

import PageLayoutWrapper from "./PageLayoutWrapper";

const Loading = (): JSX.Element => {
  return (
    <PageLayoutWrapper disablePadding>
      <LinearProgress />
    </PageLayoutWrapper>
  );
};

export default Loading;

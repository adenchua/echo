import LinearProgress from "@mui/material/LinearProgress";

import PageLayoutWrapper from "./PageLayoutWrapper";

const Loading = () => {
  return (
    <PageLayoutWrapper disablePadding>
      <LinearProgress />
    </PageLayoutWrapper>
  );
};

export default Loading;

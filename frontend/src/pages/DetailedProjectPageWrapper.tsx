import React from "react";
import TicketsContextProvider from "../components/TicketsContextProvider";
import DetailedProjectPage from "./DetailedProjectPage";

const DetailedProjectPageWrapper = (): JSX.Element => {
  return (
    <TicketsContextProvider>
      <DetailedProjectPage />
    </TicketsContextProvider>
  );
};

export default DetailedProjectPageWrapper;

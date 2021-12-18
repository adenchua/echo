import React, { useContext } from "react";
import { Redirect } from "react-router-dom";

import { UserAuthenticationContext } from "../components/contexts/UserAuthenticationContextProvider";
import PageLayoutWrapper from "../components/PageLayoutWrapper";

const HomePage = (): JSX.Element => {
  const { isLoggedIn } = useContext(UserAuthenticationContext);

  if (!isLoggedIn) {
    return <Redirect to='/' />;
  }

  return (
    <PageLayoutWrapper>
      <p>Work In Progress</p>
    </PageLayoutWrapper>
  );
};

export default HomePage;

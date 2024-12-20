import Container from "@mui/material/Container";
import { JSX } from "react";

interface ContainerWrapperProps {
  children: React.ReactNode;
}

const ContainerWrapper = (props: ContainerWrapperProps): JSX.Element => {
  const { children } = props;
  return (
    <Container disableGutters sx={{ marginLeft: 0 }} maxWidth="md">
      {children}
    </Container>
  );
};

export default ContainerWrapper;

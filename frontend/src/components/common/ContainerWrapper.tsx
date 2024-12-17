import Container from "@mui/material/Container";

interface ContainerWrapperProps {
  children: React.ReactNode;
}

const ContainerWrapper = (props: ContainerWrapperProps) => {
  const { children } = props;
  return (
    <Container disableGutters sx={{ marginLeft: 0 }} maxWidth="md">
      {children}
    </Container>
  );
};

export default ContainerWrapper;

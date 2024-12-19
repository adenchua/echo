import DoneIcon from "@mui/icons-material/DoneOutlineOutlined";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

interface FeatureCardProps {
  title: string;
  secondaryTitle: string;
}

const FeatureCard = (props: FeatureCardProps) => {
  const { title, secondaryTitle } = props;

  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: "400px",
      }}
    >
      <DoneIcon fontSize="large" sx={{ mb: 2 }} color="primary" />
      <Typography variant="h6" color="primary" align="center" mb={1}>
        {title}
      </Typography>
      <Typography align="justify">{secondaryTitle}</Typography>
    </Paper>
  );
};

export default FeatureCard;

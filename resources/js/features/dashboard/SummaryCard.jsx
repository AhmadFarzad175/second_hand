import { Card, CardContent, Typography, Stack } from "@mui/material";

const SummaryCard = ({ title, value }) => (
  <Card sx={{ minWidth: 200, flex: 1 }}>
    <CardContent>
      <Typography variant="subtitle1">{title}</Typography>
      <Typography variant="h5">{value}</Typography>
    </CardContent>
  </Card>
);



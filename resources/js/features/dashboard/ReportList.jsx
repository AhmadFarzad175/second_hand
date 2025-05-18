import { Box, Paper, Typography } from "@mui/material";

const ReportsList = ({ reports }) => (
    <Paper sx={{ p: 2, mt: 4 }}>
      <Typography variant="h6" gutterBottom>Recent Reports</Typography>
      {reports.map((report, index) => (
        <Box key={index} sx={{ mb: 1 }}>
          <Typography>{report.reason}</Typography>
          <Typography variant="caption">By {report.user} on {report.date}</Typography>
        </Box>
      ))}
    </Paper>
  );
  
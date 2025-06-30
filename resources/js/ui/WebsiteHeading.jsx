import { Typography, Box, Divider, styled } from "@mui/material";
import PropTypes from "prop-types";

const GradientText = styled(Typography)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  display: "inline-block",
}));

const WebsiteHeading = ({
  title,
  subtitle,
  align = "center",
  gradient = true,
  divider = true,
  titleVariant = "h2",
  subtitleVariant = "subtitle1",
  sx = {}
}) => {
  return (
    <Box sx={{ textAlign: align, py: 6, ...sx }}>
      {gradient ? (
        <GradientText
          variant={titleVariant}
          component="h1"
          sx={{
            fontWeight: 700,
            mb: 2,
            fontSize: {
              xs: "2rem",
              sm: "2.5rem",
              md: "3rem",
              lg: "3.5rem"
            }
          }}
        >
          {title}
        </GradientText>
      ) : (
        <Typography
          variant={titleVariant}
          component="h1"
          sx={{
            fontWeight: 700,
            mb: 2,
            fontSize: {
              xs: "2rem",
              sm: "2.5rem",
              md: "3rem",
              lg: "3.5rem"
            }
          }}
        >
          {title}
        </Typography>
      )}

      {subtitle && (
        <Typography
          variant={subtitleVariant}
          color="text.secondary"
          sx={{
            maxWidth: 600,
            mx: align === "center" ? "auto" : "unset",
            mb: 3
          }}
        >
          {subtitle}
        </Typography>
      )}

      {divider && (
        <Divider
          sx={{
            width: 200,
            height: 4,
            mx: align === "center" ? "auto" : "unset",
            background: (theme) =>
              gradient
                ? `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
                : theme.palette.divider,
            border: "none",
            borderRadius: 2
          }}
        />
      )}
    </Box>
  );
};

WebsiteHeading.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  align: PropTypes.oneOf(["left", "center", "right"]),
  gradient: PropTypes.bool,
  divider: PropTypes.bool,
  titleVariant: PropTypes.string,
  subtitleVariant: PropTypes.string,
  sx: PropTypes.object
};

export default WebsiteHeading;
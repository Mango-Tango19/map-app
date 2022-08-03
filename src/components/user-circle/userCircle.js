import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import { Box } from "@mui/system";

const StyledBadge = styled(Badge)((props) => ({
  "& .MuiBadge-badge": {
    backgroundColor: `${props.isOnline ? "#44b700" : "#f44336"}`,
    color: `${props.isOnline ? "#44b700" : "#f44336"}`,
    boxShadow: `0 0 0 2px ${props.theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: `1px solid ${props.isOnline ? "#44b700" : "#f44336"}`,
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const Circle = ({ circleInfo }) => {
  if (!circleInfo) return null;
  return (
    <Avatar
      alt='Remy Sharp'
      src={`${circleInfo.img}`}
      sx={{ width: 25, height: 25 }}
    />
  );
};

export const BigCircle = ({ circleInfo }) => {
  const left = circleInfo.coords[0] + 10;
  const top = circleInfo.coords[1] + 10;
  const radius = circleInfo.size;

  return (
    <Box sx={{ top: top, left: left, position: "absolute", zIndex: 9 }}>
      <StyledBadge
        overlap='circular'
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        variant='dot'
        isOnline={circleInfo.isOnline}
      >
        <Avatar
          alt='Remy Sharp'
          src={`${circleInfo.img}`}
          sx={{ width: radius, height: radius }}
        />
      </StyledBadge>
      <Chip label={circleInfo.name} color='white' />
    </Box>
  );
};

export default Circle;

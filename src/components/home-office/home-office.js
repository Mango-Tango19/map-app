import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Service from "../../service";
import Avatar from "@mui/material/Avatar";

import Chip from "@mui/material/Chip";
import { Paper } from "@mui/material";

import { StyledBadge } from "../user-circle/userCircle";
import { CustomButton } from "../user-card/UserCard";

const service = new Service();

export default function HomeOffice() {
  const [homeUsers, setHomeUsers] = React.useState(null);

  const getUsers = async (floorNumber) => {
    const res = await service.getUsersFromFloor(floorNumber);
    setHomeUsers(res);
  };

  React.useEffect(() => {
    let mounted = true;
    if (mounted) {
      getUsers();
    }
    return () => (mounted = false);
  }, []);

  if (!homeUsers) return null;

  return (
    <Box sx={{ width: "100%", padding: "20px 10px" }}>
      <Grid container rowSpacing={4} columnSpacing={4}>
        {homeUsers.map((item) => {
          return (
            <Grid key={item.place} item>
              <Paper
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: 1,
                }}
              >
                <StyledBadge
                  overlap='circular'
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  variant='dot'
                  isOnline={item.isOnline}
                >
                  <Avatar
                    alt='Remy Sharp'
                    src={`${item.img}`}
                    sx={{ width: 78, height: 78 }}
                  />
                </StyledBadge>
                <Chip label={item.name} color='white' />
                <CustomButton variant='outlined' size='small'>
                  Профиль
                </CustomButton>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Service from "../../service";
import { CustomButton } from "../user-card/UserCard";
import { useDispatch } from "react-redux";
import { floorActions } from "../../store/floor-slice";
import Paper from "@mui/material/Paper";
import { StyledBadge } from "../user-circle/userCircle";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";

const service = new Service();

export default function HomeOffice() {
  const [homeUsers, setHomeUsers] = React.useState(null);

  const dispatch = useDispatch();

  const getUsers = (floorNumber = 2) => {
    service
      .getUsersFromFloor(floorNumber)
      .then((res) => {
        dispatch(floorActions.requestSuccess());
        setHomeUsers(res);
      })
      .catch((err) => dispatch(floorActions.requestError()));
  };

  React.useEffect(() => {
    let mounted = false;
    if (!mounted) {
      dispatch(floorActions.performRequest());
      getUsers();
    }
    return () => (mounted = true);
  }, []);

  if (!homeUsers) return null;

  return (
    <Box sx={{ width: "100%", padding: "20px 10px" }}>
      <Grid container rowSpacing={4} columnSpacing={4}>
        {/* {homeUsers.map((item) => {
          debugger;
          return (
            <Grid item xs={3} key={item.place}>
              <UserCard userInfo={item} />
            </Grid>
          );
        })} */}
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

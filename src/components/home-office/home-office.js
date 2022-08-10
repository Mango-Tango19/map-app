import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Service from "../../service";
import UserCard from "../user-card/UserCard";

const service = new Service();

export default function HomeOffice() {
  const [homeUsers, setHomeUsers] = React.useState(null);

  const getUsers = async (floorNumber = 2) => {
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
    <Box sx={{ width: "100%" }}>
      <Grid container rowSpacing={1} columnSpacing={1}>
        {homeUsers.map((item) => {
          return (
            <Grid item xs={3} key={item.place}>
              <UserCard userInfo={item} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

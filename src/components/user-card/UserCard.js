import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { purple } from "@mui/material/colors";

export const CustomButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  padding: "10px 22px",
  borderRadius: "100px",
  color: "#325F9E",
  fontSize: "14px",
  lineHeight: "20px",
  textTransform: "none",
  "&:hover": {
    backgroundColor: " #325F9E",
    color: "white",
  },
}));

export default function UserCard({ userInfo }) {
  return (
    <Card
      sx={{
        margin: "0 20px",
        background:
          "linear-gradient(0deg, rgba(50, 95, 158, 0.05), rgba(50, 95, 158, 0.05)), #FDFBFF",
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            sx={{
              width: 42,
              height: 42,
            }}
            alt={`${userInfo.name}`}
            src={`${userInfo.img}`}
          />
        }
        title={`${userInfo.name}`}
        // subheader={`${userInfo?.position}`}
      />
      <CardContent sx={{ padding: "5px 15px" }}>
        {/* <Typography gutterBottom variant='body2' component='p'>
          {userInfo?.department}
        </Typography> */}

        <Stack spacing={1} mb={2}>
          <Box>
            <Typography variant='body2' component='p'>
              Руководитель
            </Typography>
            {/* <Typography variant='body2' color='text.secondary'>
              {userInfo?.manager}
            </Typography> */}
          </Box>
          <Box>
            <Typography variant='body2' component='p'>
              Проект
            </Typography>
            {/* <Typography variant='body2' color='text.secondary'>
              {userInfo?.project[0]}
            </Typography> */}
          </Box>

          {/* <Box>
            <Typography variant='body2' component='p'>
              Офис
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {data.office}
            </Typography>
          </Box> */}
          {/* 
          <Box>
            <Typography variant='body2' component='p'>
              Номер компьютера/места
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {data.PC_number}
            </Typography>
          </Box>

          <Box>
            <Typography variant='body2' component='p'>
              Количество мониторов
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {data.monitors}
            </Typography>
          </Box> */}
        </Stack>

        {/* <Typography variant='body2' color='text.secondary'>
          Телефон: {userInfo?.phone}
        </Typography> */}

        <Typography variant='body2' color='text.secondary' gutterBottom>
          Почта:{" "}
          {/* <Link
            href={`mailto:${userInfo?.email}`}
            sx={{ display: "inline-block", marginBottom: "10px" }}
          >
            {userInfo?.email}
          </Link> */}
        </Typography>
      </CardContent>
      <CardActions>
        <CustomButton variant='outlined' size='small'>
          Профиль
        </CustomButton>
        {/* <CustomButton variant='outlined' size='small'>
          Показать на плане
        </CustomButton> */}
      </CardActions>
    </Card>
  );
}

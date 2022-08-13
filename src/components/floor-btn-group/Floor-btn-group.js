import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import "./floor-btn-group.css";
import CircleIcon from "@mui/icons-material/Circle";
import { Typography } from "@mui/material";
import ApartmentIcon from "@mui/icons-material/Apartment";
import HomeIcon from "@mui/icons-material/Home";
import { useContext, useEffect, useState } from "react";
import GlobalContext from "../../context/GlobalContext";

const SingleBtn = ({ value, isActive, handleActiveFromClick }) => {
  return (
    <Box>
      <Button
        variant='text'
        sx={{
          display: "flex",
          flexDirection: "column",
          color: "#141C2A",
          padding: "12px 16px",
          borderRadius: "20px",
          backgroundColor: `${isActive ? "rgba(63, 80, 181, 0.04);" : null}`,
        }}
        onClick={() => handleActiveFromClick(value)}
      >
        {isActive ? (
          <CircleIcon sx={{ fontSize: 15 }} />
        ) : value === "Дом" ? (
          <HomeIcon sx={{ fontSize: 15 }} />
        ) : (
          <ApartmentIcon sx={{ fontSize: 15 }} />
        )}
      </Button>
      <Typography
        align='center'
        mt={0.5}
        sx={{
          fontSize: "12px",
          fontWeight: "500",
          lineHeight: "16px",
          letterSpacing: "0,5px",
        }}
      >
        {value === "Дом" ? null : "ИКЦ"} {value}
      </Typography>
    </Box>
  );
};

export const FloorBtnGroup = () => {
  const { currentFloor, setCurrentFloor } = useContext(GlobalContext);

  //console.log(activeFloor); // "ИКЦ-2"

  //console.log(currentFloor); // "ИКЦ-2"

  const [floorsNames, setFloorNames] = useState([
    { name: -1, isActive: false },
    { name: 1, isActive: false },
    { name: 2, isActive: true },
    { name: 3, isActive: false },
    { name: "Дом", isActive: false },
  ]);

  const handleActive = (currentFloor) => {
    let arr = floorsNames.map((item) => {
      if (currentFloor === item.name) {
        return {
          ...item,
          isActive: true,
        };
      } else {
        return {
          ...item,
          isActive: false,
        };
      }
    });

    setFloorNames(arr);
  };

  const handleActiveFromClick = (activeItemName) => {
    debugger;
    handleActive(activeItemName);
    setCurrentFloor(activeItemName);
  };

  useEffect(() => {
    if (!currentFloor) return;
    handleActive(currentFloor);
  }, [currentFloor]);

  return (
    <Box
      sx={{
        height: 80,
        backgroundColor: "rgba(253, 251, 255, 1)",
        padding: "16px 6px",
        alignItems: "center",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <>
        {floorsNames.map(({ name, isActive }, idx) => {
          return (
            <SingleBtn
              value={name}
              key={idx}
              isActive={isActive}
              handleActiveFromClick={handleActiveFromClick}
            />
          );
        })}
      </>
    </Box>
  );
};

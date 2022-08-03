import React from "react";
import Circle from "../user-circle/userCircle";
import Badge from "@mui/material/Badge";
import { BigCircle } from "../user-circle/userCircle";

const SeatsCircles = ({ areas, showUserCard }) => {
  const [isCircleVisible, setIsCircleVisible] = React.useState(false);
  const [circleInfo, setCircleInfo] = React.useState(null);

  const mapperAreaMouseEnterHandler = async (item) => {
    setCircleInfo({ ...item, size: 78 });
    setIsCircleVisible(true);
  };

  return areas.map((item) => {
    const left = item.coords[0] - 10;
    const top = item.coords[1] - 10;
    const color = item.isOnline ? "success" : "secondary";
    return (
      <div key={item.place}>
        <Badge
          key={item.place}
          color={color}
          badgeContent=' '
          variant='dot'
          sx={{
            position: "absolute",
            left: left,
            top: top,
            zIndex: 9,
          }}
          onMouseEnter={() => mapperAreaMouseEnterHandler(item)}
          onMouseLeave={() => setIsCircleVisible(false)}
          onClick={() => showUserCard(item.place)}
        >
          <Circle key={item.place} circleInfo={item} />
        </Badge>
        {isCircleVisible ? <BigCircle circleInfo={circleInfo} /> : null}
      </div>
    );
  });
};
export default SeatsCircles;

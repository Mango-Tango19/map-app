import React, { useEffect } from "react";
import Circle from "../user-circle/userCircle";
import Badge from "@mui/material/Badge";
import { BigCircle } from "../user-circle/userCircle";

//import { useSelector } from "react-redux";

const SeatsCircles = ({ areas, showUserCard, userInfo }) => {
  const [isCircleVisible, setIsCircleVisible] = React.useState(false);
  const [circleInfo, setCircleInfo] = React.useState(null);

  //const userId = useSelector((state) => state.userCircle.userId);

  // const { userById, setUserById } = useUserInfo();
  // console.log(areas);
  // console.log(setUserInfo);

  const mapperAreaMouseEnterHandler = async (item) => {
    setCircleInfo({ ...item, size: 78 });
    setIsCircleVisible(true);
  };

  useEffect(() => {
    if (!userInfo) return;
    setCircleInfo({ ...userInfo, size: 78 });
    setIsCircleVisible(true);
  }, [userInfo]);

  const handleClickCircle = (item) => {
    showUserCard(item);
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
          onClick={() => handleClickCircle(item)}
        >
          <Circle key={item.place} circleInfo={item} />
        </Badge>
        {isCircleVisible ? <BigCircle circleInfo={circleInfo} /> : null}
      </div>
    );
  });
};
export default SeatsCircles;

import React, { useCallback, useEffect, memo } from "react";
import Circle from "../user-circle/userCircle";
import Badge from "@mui/material/Badge";
import { BigCircle } from "../user-circle/userCircle";
import { useDispatch, useSelector } from "react-redux";
import { floorActions } from "../../store/floor-slice";

const SeatsCircles = ({ areas }) => {
  const { userPlace } = useSelector((state) => state.floor);
  const dispatch = useDispatch();

  const [isCircleVisible, setIsCircleVisible] = React.useState(false);
  const [circleInfo, setCircleInfo] = React.useState(null);

  const mapperAreaMouseEnterHandler = async (item) => {
    setCircleInfo({ ...item, size: 78 });
    setIsCircleVisible(true);
  };

  const getCircleInfo = useCallback(
    (userPlace) => {
      return areas.find((area) => area.place === userPlace);
    },
    [userPlace]
  );

  useEffect(() => {
    if (!userPlace) return;
    let res = getCircleInfo(userPlace);
    setCircleInfo({ ...res, size: 78 });
    setIsCircleVisible(true);
  }, [userPlace]);

  const handleClickCircle = useCallback((item) => {
    // setCircleInfo({ ...item, size: 78 });
    // setIsCircleVisible(true);
    console.log(item);
    dispatch(floorActions.setCurrentPlace(item.place));
  }, []);

  if (areas.length === 0) {
    return null;
  }

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

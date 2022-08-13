import React, { useEffect, useState, useContext } from "react";
import Circle from "../user-circle/userCircle";
import Badge from "@mui/material/Badge";
import { BigCircle } from "../user-circle/userCircle";
import LoadingIndicator from "../loading-indicator/loadingIndicator";
import GlobalContext from "../../context/GlobalContext";

const SeatsCircles = ({ areas }) => {
  const { userPlace, setUserPlace } = useContext(GlobalContext);

  // console.log(areas);
  const [isCircleVisible, setIsCircleVisible] = useState(false);
  const [isClick, setIsClick] = useState(false);
  const [circleInfo, setCircleInfo] = useState(null);

  const mapperAreaMouseEnterHandler = async (item) => {
    setCircleInfo({ ...item, size: 78 });
    setIsCircleVisible(true);
  };

  const getCircleInfo = (userPlace) => {
    let res = areas.find((area) => area.place === userPlace);
    setCircleInfo({ ...res, size: 78 });
    setIsClick(true);
  };

  useEffect(() => {
    if (userPlace === "") return;
    getCircleInfo(userPlace);
  }, [userPlace]);

  const handleClickCircle = (item) => {
    setCircleInfo({ ...item, size: 78 });
    setUserPlace(item.place);
    setIsClick(true);
  };

  if (areas.length === 0) return <LoadingIndicator />;

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
          <Circle key={item.place} circleInfo={item} keyProp={item.place} />
        </Badge>
        {isCircleVisible ? <BigCircle circleInfo={circleInfo} /> : null}
        {isClick ? <BigCircle circleInfo={circleInfo} /> : null}
      </div>
    );
  });
};
export default SeatsCircles;

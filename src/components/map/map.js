import * as React from "react";

import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import ImageMapper from "react-img-mapper";
import PrismaZoom from "react-prismazoom";

import GlobalContext from "../../context/GlobalContext";
import { useContext, useState, useEffect, useCallback } from "react";

import LoadingIndicator from "../loading-indicator/loadingIndicator";

import SeatsCircles from "../seatc-circles/seatsCircles";

import Service from "../../service";

import "./map.css";

const service = new Service();

const Mapper = () => {
  const { currentFloor } = useContext(GlobalContext);

  const [imageSrc, setImageSrc] = useState("./img/2.png");

  const [areas, setAreas] = useState([]);

  const getAreas = useCallback(
    async (currentFloor) => {
      service
        .getUsersFromFloor() //обязательно передать currentFloor!!! по умолч 2
        .then((res) => {
          setAreas(res);
        })
        .catch((err) => {
          throw Error(`new error ${err}`);
        });
    },
    [currentFloor]
  );

  useEffect(() => {
    if (currentFloor === "Дом") return;
    setImageSrc(`./img/${currentFloor}.png`);
  }, [currentFloor]);

  useEffect(() => {
    if (currentFloor === "Дом") return;

    getAreas(currentFloor);
  }, [currentFloor]);

  const URL = imageSrc;
  const MAP = {
    name: "my-map",
    areas: areas,
  };

  return (
    <>
      <SeatsCircles areas={areas} />
      <ImageMapper src={URL} map={MAP} />
    </>
  );
};

class Map extends React.Component {
  // props  { floor: "3", name: "Андрей Тормин", place: "2A3" }
  constructor(props) {
    super(props);
    this.prismaZoom = React.createRef();
    this.state = {
      zoom: 1,
      allowZoom: true,
      allowPan: true,
    };
  }

  onZoomChange = (zoom) => {
    this.setState({ zoom });
  };

  onClickOnZoomOut = () => {
    this.prismaZoom.current.zoomOut(1);
  };

  onClickOnZoomIn = () => {
    this.prismaZoom.current.zoomIn(1);
  };

  render() {
    return (
      <div className='map-wrapper'>
        <div className='map'>
          <PrismaZoom
            minZoom={1}
            maxZoom={3}
            onZoomChange={this.onZoomChange}
            ref={this.prismaZoom}
          >
            <Mapper />
          </PrismaZoom>
        </div>
        <div className='buttons'>
          <Box
            sx={{
              display: "flex",
              "& > *": {
                m: 1,
              },
            }}
          >
            <ButtonGroup
              orientation='vertical'
              aria-label='vertical contained button group'
              variant='text'
            >
              <IconButton key='one' onClick={this.onClickOnZoomIn}>
                <ControlPointIcon />
              </IconButton>
              <IconButton key='two' onClick={this.onClickOnZoomOut}>
                <RemoveCircleOutlineIcon />
              </IconButton>
            </ButtonGroup>
          </Box>
        </div>
      </div>
    );
  }
}

export default Map;

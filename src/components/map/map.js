import * as React from "react";

import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import ImageMapper from "react-img-mapper";
import PrismaZoom from "react-prismazoom";
import { floorActions } from "../../store/floor-slice";
import LoadingIndicator from "../loading-indicator/loadingIndicator";
import HomeOffice from "../home-office/home-office";

import { useDispatch, useSelector } from "react-redux";
import { useCallback, useState, useEffect } from "react";

import SeatsCircles from "../seatc-circles/seatsCircles";

import Service from "../../service";

import "./map.css";

const service = new Service();

const Mapper = () => {
  const dispatch = useDispatch();
  const { loading, error, currentFloor } = useSelector((state) => state.floor);

  //console.log(loading, error);
  const [areas, setAreas] = useState([]);
  //const [imageSrc, setImageSrc] = useState(null);

  // const getImageSrc = (floor) => {
  //   setImageSrc(`./img/${floor}.png`);
  // };

  // useEffect(() => {
  //   if (!currentFloor) return;
  //   getImageSrc(currentFloor);
  // }, [currentFloor]);

  const getAreas = useCallback(
    async (currentFloor) => {
      service
        .getUsersFromFloor(currentFloor)
        .then((res) => {
          dispatch(floorActions.requestSuccess());
          setAreas(res);
        })
        .catch((err) => {
          dispatch(floorActions.requestError());
          console.error(err);
        });
    },
    [currentFloor]
  );

  useEffect(() => {
    if (!currentFloor) return;
    let mounted = false;

    if (!mounted) {
      debugger;
      getAreas(currentFloor);
    }

    return () => (mounted = true);
  }, []);

  const map = {
    name: "my-map",
    areas: areas,
  };

  if (loading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <h1>Error! </h1>;
  }

  // if (!areas) {
  //   return <LoadingIndicator />;
  // }

  return (
    <>
      <SeatsCircles areas={areas} />
      <ImageMapper src={`./img/${currentFloor}.png`} map={map} />
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
        <div className='zoom-buttons'>
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

const MapWrapper = () => {
  const currentFloor = useSelector((state) => state.floor.currentFloor);

  if (!currentFloor) {
    return <h1>Welcome </h1>;
  }

  if (currentFloor === "Дом") {
    return <HomeOffice />;
  }
  // const currentUser = useSelector((state) => state.floor.userPlace);
  return <Map currentFloor={currentFloor} />;
};

export default MapWrapper;

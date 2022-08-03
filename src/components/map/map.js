import * as React from "react";

import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import NearMeIcon from "@mui/icons-material/NearMe";
import ImageMapper from "react-img-mapper";

import PrismaZoom from "react-prismazoom";
import LoadingIndicator from "../loading-indicator/loadingIndicator";

import SeatsCircles from "../seatc-circles/seatsCircles";

import Service from "../../service";

import "./map.css";

const service = new Service();

// {
//     "areas" : [
//         "<area target='_self' alt='2A1' title='2A1' href='2A1' coords='56,67,11' shape='circle'>",
//         "<area target='_self' alt='2A2' title='2A2' href='2A2' coords='86,66,12' shape='circle'>",
//         "<area target='_self' alt='2A3' title='2A3' href='2A3' coords='132,67,12' shape='circle'>",
//         "<area target='_self' alt='2A4' title='2A4' href='2A4' coords='165,68,12' shape='circle'>",
//         "<area target='_self' alt='2A5' title='2A5' href='2A5' coords='54,109,13' shape='circle'>",
//         "<area target='_self' alt='2A6' title='2A6' href='2A6' coords='87,110,14' shape='circle'>",
//         "<area target='_self' alt='2A7' title='2A7' href='2A7' coords='133,110,12' shape='circle'>",
//         "<area target='_self' alt='2A8' title='2A8' href='2A8' coords='161,110,13' shape='circle'>"
//     ]
// }

const Mapper = ({ imageSrc, showUserCard, floorNumber }) => {
  console.log(floorNumber);
  const [areas, setAreas] = React.useState(null);

  const getAreas = async (floorNumber) => {
    const res = await service.getUsersFromFloor(floorNumber);
    setAreas(res);
  };

  React.useEffect(() => {
    let mounted = true;
    if (mounted) {
      getAreas(floorNumber);
    }
    return () => (mounted = false);
  }, [floorNumber]);

  const URL = imageSrc;
  const MAP = {
    name: "my-map",
    areas: areas,
  };

  if (!areas) {
    return <LoadingIndicator />;
  } else {
    return (
      <>
        <SeatsCircles areas={areas} showUserCard={showUserCard} />
        <ImageMapper src={URL} map={MAP} />
      </>
    );
  }
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
      floor: null,
      alt: "",
      src: "",
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

  getFloor = () => {
    let floor = this.props.activeFloorFromClick
      ? this.props.activeFloorFromClick
      : this.props.activeFloorAndUser?.floor;

    return floor ? parseInt(floor.match(/\d+/)) : 2;
  };

  getImageSrc = () => {
    let img = this.props.activeFloorFromClick
      ? this.props.activeFloorFromClick
      : this.props.activeFloorAndUser?.floor;
    if (!img) {
      return "./img/2.png";
    }

    return `./img/${img}.png`;
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
            <Mapper
              imageSrc={this.getImageSrc()}
              showUserCard={this.props.showUserCard}
              floorNumber={this.getFloor()}
            />
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
              <IconButton key='three'>
                <NearMeIcon />
              </IconButton>
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

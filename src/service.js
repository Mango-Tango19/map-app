//coords from app
import Floor2Areas from "./coords/2floor.json";
import Floor3Areas from "./coords/3floor.json";

//results from server
import res2floor from "./serverRes/res2floor.json";

export default class Service {
  //   getCoordsByFloor(floorNumber = 2) {
  //     let areas = [];
  //     switch (floorNumber) {
  //       case 2:
  //         areas = Floor2Areas.Floor2Areas;
  //         break;
  //       default:
  //         areas = Floor3Areas.Floor3Areas;
  //     }
  //     return areas;
  //   }

  coordsAndUsers(floorNumber, resFromServer) {
    let areas = [];
    switch (floorNumber) {
      case 2:
        areas = Floor2Areas.Floor2Areas;
        break;
      default:
        areas = Floor3Areas.Floor3Areas;
    }

    return resFromServer.map((item) => {
      return { ...item, ...areas.find((area) => area.place === item.place) };
    });
  }

  async getData(url, body) {
    const res = await fetch(url, { floor: body });

    if (!res.ok || res.status !== 200) {
      throw new Error(`Request failed with status code ${res.status}`);
    }
    return await res.json();
  }

  getUsersFromFloor = async (floorNumber = 2) => {
    //return await this.getData('users/floor', floorNumber)

    const resFromServer = res2floor.res;

    const usersAndCoords = this.coordsAndUsers(floorNumber, resFromServer);

    return usersAndCoords;
  };
}

//coords from app
import Floor2Areas from "./coords/2floor.json";
import Floor3Areas from "./coords/3floor.json";
import Floor1Areas from "./coords/1floor.json";

//results from server
import res2floor from "./serverRes/res2floor.json";

//single user from server
import userInfo from "./serverRes/userInfo.json";

export default class Service {
  getCoordinatesByFloorNumber(floorNumber) {
    let areas = [];
    switch (floorNumber) {
      case 1:
        areas = Floor1Areas.Floor1Areas;
        break;
      case 2:
        areas = Floor2Areas.Floor2Areas;
        break;
      case 3:
        areas = Floor3Areas.Floor3Areas;
        break;

      default:
        areas = Floor3Areas.Floor3Areas;
    }

    return areas;
  }

  coordsAndUsers(floorNumber, resFromServer) {
    const areas = this.getCoordinatesByFloorNumber(floorNumber);

    return resFromServer.map((item) => {
      return { ...item, ...areas.find((area) => area.place === item.place) };
    });
  }

  async getData(url, body) {
    const res = await fetch(url, { body });

    if (!res.ok || res.status !== 200) {
      throw new Error(`Request failed with status code ${res.status}`);
    }
    return await res.json();
  }

  getUsersFromFloor = async (floorNumber = 2) => {
    //return await this.getData('users/floor', {floorNumber })

    const resFromServer = res2floor.res;
    return this.coordsAndUsers(floorNumber, resFromServer);
  };

  //get user by ID/place

  getUserById = (res) => {
    // (result);Object { floor: "3", name: "Андрей Тормин", place: "2A3" }
    // const resFromServer =  await this.getData('users/floor', {id })
    console.log(res);
    const resFromServer = userInfo.res;
    // let areas = this.getCoordinatesByFloorNumber(res?.floor)
    const floorCoordinates = this.coordsAndUsers(res?.floor, resFromServer);
    //    floorCoordinates ​
    // PC_number: "A250"
    // department: "Отдел Д-1"
    // email: "super@mail.ru"
    // img: "https://rickandmortyapi.com/api/character/avatar/1.jpeg"
    // manager: "Боровских Илья Юрьевич"
    // monitors: 2
    // name: "Сотрудник с сервера"
    // office: "ИКЦ-2"
    // online: true
    // phone: "122"
    // place: "A250"
    // position: "Разработчик"
    // project: (1) […]
    // userID: "2A3"
    debugger;
    const userFromSearchByCoordinates = floorCoordinates.filter((item) => {
      debugger;
      return item.place === res.place;
    });
    return userFromSearchByCoordinates;
  };
}

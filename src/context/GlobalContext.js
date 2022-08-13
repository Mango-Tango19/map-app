import React from "react";

const GlobalContext = React.createContext({
  currentFloor: null,
  setCurrentFloor: (floor) => {},
  userPlace: "",
  setUserPlace: (place) => {},
  userInfo: {},
  setUserInfo: (data) => {},
});

export default GlobalContext;

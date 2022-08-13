import React, { useState, useEffect, useReducer, useMemo } from "react";
import GlobalContext from "./GlobalContext";

export default function ContextWrapper(props) {
  const [currentFloor, setCurrentFloor] = useState(2);

  const [userPlace, setUserPlace] = useState("");

  return (
    <GlobalContext.Provider
      value={{ currentFloor, setCurrentFloor, userPlace, setUserPlace }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
}

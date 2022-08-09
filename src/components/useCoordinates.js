import { useCallback, useEffect, useReducer } from "react";

import Service from "../service";

const service = new Service();

const initialState = {
  floor: {
    floorNumber: null,
    place: null,
  },
  UserInfo: null,
  status: "idle", // idle | work | success | error
  items: [],
  loading: true,
  error: false,
};

const reducer = (state, action) => {
  // console.log(`Action: ${action.type}; Payload:`, action.payload);
  switch (action.type) {
    case "floor:change": {
      return {
        ...state,
        status: "work",
        floor: {
          place: null,
          floorNumber: action.payload,
        },
      };
    }
    case "floorUser:change": {
      return {
        ...state,
        status: "work",
        floor: {
          place: action.payload.place,
          floorNumber: action.payload.floor,
        },
      };
    }
    case "user:change": {
      return {
        ...state,
        status: "work",
        floor: {
          ...state.floor,
          place: action.payload,
        },
      };
    }
    case "floorUser:reset": {
      return {
        ...state,
        status: "work",
        floor: {
          place: null,
          floorNumber: null,
        },
      };
    }
    case "request:success": {
      return {
        ...state,
        status: "success",
        items: action.payload,
        loading: false,
      };
    }

    case "request:error": {
      return {
        ...state,
        status: "error",
        loading: false,
        error: true,
      };
    }

    default:
      return state;
  }
};

export const useCoordinates = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const changeFloor = useCallback(
    (floor = null) => dispatch({ type: "floor:change", payload: floor }),
    []
  );

  const changeFloorUser = useCallback(
    (payload = { palce: null, floor: null }) =>
      dispatch({ type: "floorUser:change", payload }),
    []
  );

  const changeUser = useCallback(
    (place = null) => dispatch({ type: "user:change", payload: place }),
    []
  );

  //   useEffect(() => {
  //     changeUser()
  //   }, [changeUser])

  //   useEffect(() => {
  //     changeFloorUser()
  //   }, [changeFloorUser])

  useEffect(() => {
    changeFloor();
  }, [changeFloor]);

  const performRequest = useCallback(() => {
    if (!state.floor.floorNumber) return;
    dispatch({ type: "request:start" });

    service
      .getUsersFromFloor(state.floor.floorNumber)
      .then((data) => dispatch({ type: "request:success", payload: data }))
      .catch((err) => {
        console.error(err);
        dispatch({ type: "request:error" });
      });
  }, [state.floor.floorNumber]);

  useEffect(() => {
    performRequest();
  }, [performRequest]);

  return {
    ...state,
    changeFloor,
  };
};

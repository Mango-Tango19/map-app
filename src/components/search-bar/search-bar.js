import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useDispatch } from "react-redux";
import { floorActions } from "../../store/floor-slice";

const floorsAndPeople = [
  { floor: 2, name: "Гиззатулин Азамат", place: "2A1" },
  { floor: 1, name: "Булатова Дарья", place: "2A2" },
  { floor: 2, name: "Андрей Тормин", place: "2A7" },
  { floor: 3, name: "Наумова Маргарита", place: "2A4" },
  { floor: 3, name: "Боровских Илья", place: "2A5" },
];

export default function SearchBar() {
  const dispatch = useDispatch();

  const [value, setValue] = React.useState();

  const handleSearch = (e, newValue) => {
    debugger;
    //этаж должен приходить в формате  2, 3,
    //  debugger;
    if (!newValue) return;
    setValue(newValue);
    dispatch(floorActions.setCurrentFloor(newValue?.floor));
    dispatch(floorActions.setCurrentPlace(newValue?.place));
  };

  const defaultProps = {
    options: floorsAndPeople,
    getOptionLabel: (option) => option.name,
  };

  return (
    <Autocomplete
      sx={{ padding: "20px" }}
      {...defaultProps}
      value={value}
      onChange={handleSearch}
      // onFocus={() => destroyCard()}
      disablePortal
      renderInput={(params) => <TextField {...params} label='Фамилия/Место' />}
    />
  );
}

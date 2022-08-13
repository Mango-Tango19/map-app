import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import GlobalContext from "../../context/GlobalContext";
import { useContext, useState } from "react";

const floorsAndPeople = [
  { floor: 2, name: "Гиззатулин Азамат", place: "2A1" },
  { floor: 1, name: "Булатова Дарья", place: "2A2" },
  { floor: 2, name: "Андрей Тормин", place: "2A3" },
  { floor: 3, name: "Наумова Маргарита", place: "2A4" },
  { floor: 3, name: "Боровских Илья", place: "2A5" },
  { floor: "Дом", name: "Самойлов Алексей", place: "" },
];

export default function SearchBar() {
  const [value, setValue] = useState(null);

  const { setCurrentFloor, setUserPlace } = useContext(GlobalContext);

  const handleSearch = (e, newValue) => {
    //этаж должен приходить в формате  2, 3,
    //  debugger;
    debugger;
    if (!newValue) return;
    setValue(newValue);
    setUserPlace(newValue.place);
    setCurrentFloor(newValue.floor);
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
      //onFocus={() => destroyCard()}
      disablePortal
      renderInput={(params) => <TextField {...params} label='Фамилия/Место' />}
    />
  );
}

import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const floorsAndPeople = [
  { floor: "ИКЦ-2", name: "Гиззатулин Азамат", place: "2A1" },
  { floor: "ИКЦ-1", name: "Булатова Дарья", place: "2A2" },
  { floor: "ИКЦ-3", name: "Андрей Тормин", place: "2A3" },
  { floor: "ИКЦ-4", name: "Наумова Маргарита", place: "2A4" },
  { floor: "ИКЦ-5", name: "Боровских Илья", place: "2A5" },
];

export default function SearchBar({ handleFloorFromSearch, destroyCard }) {
  const [value, setValue] = React.useState(null);

  const handleSearch = (e, newValue) => {
    //этаж должен приходить в формате  "ИКЦ-2", "ИКЦ-3",
    //  debugger;
    setValue(newValue);
    handleFloorFromSearch(newValue);
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
      onFocus={() => destroyCard()}
      disablePortal
      renderInput={(params) => <TextField {...params} label='Фамилия/Место' />}
    />
  );
}

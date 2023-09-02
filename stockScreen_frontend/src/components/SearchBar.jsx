import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Search } from "semantic-ui-react";

function SearchBar() {
  const [value, setValue] = useState("");
  const SearchBarRef = useRef();
  useEffect(() => {
    SearchBarRef.current.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        // axios.get("https://localhost:8080/api/querystock",{
        //     params:{
        //         symbol:value
        //     }
        // })
        console.log("Searching....");
      }
    });

    return () => SearchBarRef.current.removeEventListener();
  }, []);

  function handleValueChange(e, data) {
    setValue(data.value);
    console.log(data.value);
  }

  return (
    <Search
      className="flex justify-end"
      aligned="right"
      showNoResults={false}
      value={value}
      onSearchChange={handleValueChange}
      ref={SearchBarRef}
    />
  );
}

export default SearchBar;

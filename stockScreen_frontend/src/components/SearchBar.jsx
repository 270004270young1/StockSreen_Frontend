import axios from "axios";
import { useEffect, useReducer, useRef, useState } from "react";
import { Search } from "semantic-ui-react";

const initialState = {
  loading: false,
  results: [],
  value: "",
};

function searchReducer(state, action) {
  switch (action.type) {
    case "CLEAN_SEARCH":
      return initialState;
    case "START_SEARCH":
      return { ...state, loading: true, value: action.value };
    case "FINISH_SEARCH":
      return { ...state, loading: false, results: action.results };
    case "UPDATE_SELECTION":
      return { ...state, value: action.selection };
    case "CLEAN_RESULT":
      return { ...state, results: [] };
    default:
      throw new Error("searchReducer Switch Error.");
  }
}

function SearchBar() {
  //const [value, setValue] = useState("");
  const SearchBarRef = useRef();
  const [state, dispatch] = useReducer(searchReducer, initialState);
  const { loading, results, value } = state;
  useEffect(() => {
    const controller = new AbortController();
    if (value.length > 0) {
      axios
        .get("http://localhost:8080/api/searchstocks", {
          params: {
            symbol: value,
          },
          signal: controller.signal,
        })
        .then((e) => {
          const set = new Set();
          const stocks = [];
          e.data.forEach((stock) => {
            if (!set.has(stock.symbol)) {
              stocks.push({ title: stock.symbol });
              set.add(stock.symbol);
            }
          });
          dispatch({ type: "FINISH_SEARCH", results: stocks });
          console.log(e.data);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      dispatch({ type: "CLEAN_SEARCH" });
    }

    return () => {
      controller.abort();
      dispatch({ type: "CLEAN_RESULT" });
    };
  }, [value]);

  function handleValueChange(e, data) {
    dispatch({ type: "START_SEARCH", value: data.value });
  }

  return (
    <Search
      className="flex justify-end"
      loading={loading}
      value={value}
      onSearchChange={handleValueChange}
      ref={SearchBarRef}
      results={results}
      onResultSelect={(e, data) =>
        dispatch({ type: "UPDATE_SEARCH", selection: data.symbol })
      }
    />
  );
}

export default SearchBar;

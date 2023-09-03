import { useEffect, useReducer } from "react";
import { Button } from "semantic-ui-react";
const init = {
  name: "Matthew",
  age: 20,
  address: {
    pos: "Lam Tin",
    time: "12",
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "CHANGE_NAME":
      return { ...state, name: action.name };
    case "CHANGE_AGE":
      return { ...state, age: action.age };
    case "CHANGE_ADDRESS":
      return { ...state, address: action.address };
  }
}
export default function TestChild({ num }) {
  const [state, dispatch] = useReducer(reducer, init);

  const { name, age, address } = state;

  useEffect(() => {
    console.log(address);
  }, [address]);

  useEffect(() => {
    console.log(num);
  }, [num]);

  return (
    <>
      <Button
        content="ChangeName"
        onClick={(e) => dispatch({ type: "CHANGE_NAME", name: "Randy" })}
      />
      <Button
        content="ChangeAge"
        onClick={(e) => dispatch({ type: "CHANGE_AGE", age: 18 })}
      />
      <Button
        content="ChangeAddress"
        onClick={(e) =>
          dispatch({
            type: "CHANGE_ADDRESS",
            address: { pos: "KT", time: "2" },
          })
        }
      />
    </>
  );
}

import { useEffect, useState } from "react";
import TestChild from "./TestChild";
import { Button } from "semantic-ui-react";
import { useParams } from "react-router-dom";

// export default function Test() {
//   const [num, setNum] = useState(0);
//   return (
//     <>
//       <h1>{num}</h1>
//       <Button content="Trigger" onClick={(e) => setNum(num + 1)} />
//       <TestChild num={num} />
//     </>
//   );
// }

export default function Test() {
  let { symbol } = useParams();

  useEffect(() => {
    console.log(symbol);
  }, []);
  return (
    <>
      <h1>Testing</h1>
      <h1>{symbol}</h1>
    </>
  );
}

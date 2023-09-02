import { useEffect, useState, useRef } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

function StockInfo() {
  //const [candlesticks, setCandlesticks] = useState();
  //const abortControllerRef = useRef(new AbortController());

  // async function queryStock() {
  //   try {
  //     const data = await axios.get("http://localhost:8080/api/querystock", {
  //       signal: abortControllerRef.current.signal,
  //     });
  //     console.log(data);
  //     //setData(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    //const controller = abortControllerRef.current;
    // queryStock();

    const abortController = new AbortController();
    setIsLoading(true);
    axios
      .get("http://localhost:8080/api/querystock", {
        signal: abortController.signal,
      })
      .then((e) => {
        console.log(e.data);

        const dataList = [];
        e.data.candleSticks.forEach((obj) => {
          const dataObj = {
            x: obj.datetime,
            y: [obj.open, obj.high, obj.low, obj.close],
          };

          dataList.push(dataObj);
        });
        console.log(dataList);
        setData([{ data: dataList }]);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
    return () => {
      abortController.abort();
      setIsLoading(true);
    };
  }, []);

  return (
    <>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <h1>StockInfo</h1>
          <Chart type="candlestick" series={data} options={{}} />
        </div>
      )}
    </>
  );
}

export default StockInfo;

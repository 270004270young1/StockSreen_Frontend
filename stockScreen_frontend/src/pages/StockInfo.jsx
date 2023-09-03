import { useEffect, useState, useRef } from "react";
import Chart from "react-apexcharts";
import axios from "axios";
import { useParams } from "react-router-dom";

function StockInfo() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  let { symbol } = useParams();
  useEffect(() => {
    //const controller = abortControllerRef.current;
    // queryStock();

    const abortController = new AbortController();
    setIsLoading(true);
    axios
      .get(`http://localhost:8080/api/querystock/${symbol}`, {
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
        dataList.reverse();
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
  }, [symbol]);

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

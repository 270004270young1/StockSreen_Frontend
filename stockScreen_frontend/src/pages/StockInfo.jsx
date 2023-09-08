import { useEffect, useState, useRef } from "react";
import Chart from "react-apexcharts";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Header, Label, Loader } from "semantic-ui-react";

function StockInfo() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
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
        setError("");
      })
      .catch((e) => {
        console.log(e);
        setError(e.response.data.message);
      });
    return () => {
      abortController.abort();
      setError("");
    };
  }, [symbol]);

  return (
    <>
      {isLoading ? (
        <div>
          <div className="flex justify-center">
            <Label
              className={error.length === 0 ? "hidden" : ""}
              content={error}
            />
          </div>
          <Loader active={isLoading}>Loading...</Loader>
        </div>
      ) : (
        <div>
          <Header>{symbol}</Header>
          <Chart type="candlestick" series={data} options={{}} />
        </div>
      )}
    </>
  );
}

export default StockInfo;

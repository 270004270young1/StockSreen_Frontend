import { useEffect, useState, useRef } from "react";
import Chart from "react-apexcharts";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Header, Label, Loader } from "semantic-ui-react";

function StockInfo() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState([]);
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
        setData([{ data: dataList }]);
        setIsLoading(false);
        setErrors([]);
      })
      .catch((e) => {
        console.log(e);
        setErrors([...errors, e.response.data.message]);
      });
    return () => {
      abortController.abort();
      setErrors([]);
    };
  }, [symbol]);

  return (
    <>
      {isLoading ? (
        <div>
          <div className="flex justify-center">
            {errors.map((error) => (
              <Label key={error} content={error} />
            ))}
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

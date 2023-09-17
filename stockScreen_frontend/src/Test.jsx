import { useEffect, useState } from "react";
import TestChild from "./TestChild";
import { Button } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import AnyChart from "anychart-react";
import anychart from "anychart";
import axios from "axios";

export default function Test() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState([]);
  let { symbol } = useParams();
  useEffect(() => {
    //const controller = abortControllerRef.current;
    // queryStock();

    const abortController = new AbortController();
    //setIsLoading(true);
    axios
      .get(`http://localhost:8080/api/querystock/${symbol}`, {
        signal: abortController.signal,
      })
      .then((e) => {
        const dataList = [];
        e.data.candleSticks.map((candlestick) => {
          dataList.push([
            candlestick.datetime,
            candlestick.open,
            candlestick.high,
            candlestick.low,
            candlestick.close,
            candlestick.volume,
          ]);
        });
        console.log(dataList);

        const dataTable = anychart.data.table();
        dataTable.addData(dataList);
        const mapping = dataTable.mapAs({
          x: 0,
          open: 1,
          high: 2,
          low: 3,
          close: 4,
        });
        const volumeMapping = dataTable.mapAs({ x: 0, volume: 5 });
        const chart = anychart.stock();
        const candlestickPlot = chart.plot(0);
        candlestickPlot.candlestick(mapping);
        const volumeSeries = candlestickPlot.column(volumeMapping);
        volumeSeries.name("Volume");
        volumeSeries.maxHeight("30%").bottom(0);
        chart.container("container");

        //candlestickPlot.sma(mapping, 50, "line");
        console.log(volumeMapping);
        setData(chart);
        //setIsLoading(false);
        //setErrors([]);
      })
      .catch((e) => {
        console.log(e);
        //setErrors([...errors, e.response.data.message]);
      });
    return () => {
      abortController.abort();
      //setErrors([]);
    };
  }, [symbol]);

  return (
    <>
      <div className="flex justify-center">
        <AnyChart instance={data} width={1000} height={1000} />
      </div>
    </>
  );
}

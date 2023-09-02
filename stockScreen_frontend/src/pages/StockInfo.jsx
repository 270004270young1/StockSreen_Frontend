import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

async function queryStock(source, setData) {
  try {
    const data = await axios.get("http://localhost:8080/api/querystock", {
      cancelToken: source.token,
    });
    console.log(data);
    setData(data);
  } catch (error) {
    console.log(error);
  }
}
function StockInfo() {
  const [candlesticks, setCandlesticks] = useState();
  let source = axios.CancelToken.source();
  const [data, setData] = useState(null);
  useEffect(() => {
    queryStock(source, setData);
    // const formatCandlesticks = data.map((element)=>{

    // })
    // setCandlesticks({})
    return () => source.cancel("Cancle data");
    //console.log(data);
  }, []);

  return (
    <>
      <h1>StockInfo</h1>
    </>
  );
}

export default StockInfo;

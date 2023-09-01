import { Container } from "semantic-ui-react";
import ApexCharts from "apexcharts";
import { useEffect, useMemo, useRef, useState } from "react";
import Chart from "react-apexcharts";

const options = {
  chart: {
    type: "candlestick",
  },
  series: [
    {
      data: [
        {
          x: new Date(2016, 1, 1),
          y: [6593.34, 6600, 6582.63, 6600],
        },
        {
          x: new Date(2016, 1, 2),
          y: [6595.16, 6604.76, 6590.73, 6593.86],
        },
      ],
    },
  ],
};

function Home() {
  const chartRef = useRef(null);

  // useEffect(() => {
  //   const chart = new ApexCharts(chartRef.current, options);

  //   chart.render();
  //   return () => {
  //     chartRef.current.replaceChildren();
  //   };
  // }, []);
  return (
    <div>
      <Container textAlign="center">
        <h1>Hello</h1>
      </Container>
      <Chart type={options.chart.type} series={options.series} options={{}} />
    </div>
  );
}

export default Home;

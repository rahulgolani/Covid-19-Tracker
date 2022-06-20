import axios from "axios";
import React, { useState, useEffect } from "react";
import { Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import "./chart.css";
import { display } from "@mui/system";
import { blue } from "@mui/material/colors";

function LineGraph({ casesType = "cases" }) {
  // https://disease.sh/v3/covid-19/historical/all?lastdays=30
  const [chartData, setChartData] = useState([]);
  const [chartLabel, setChartLabel] = useState([]);

  const buildChartData = (data, casesType = "cases") => {
    const chartDataTemp = [];
    const chartLabelTemp = [];
    let lastDataPoint;
    for (let date in data[casesType]) {
      // const newDataPoint = {
      //   x: date,
      //   y: data[casesType][date],
      // };
      if (lastDataPoint) {
        chartLabelTemp.push(date);
        chartDataTemp.push(data[casesType][date] - lastDataPoint);
      }
      lastDataPoint = data[casesType][date];

      // chartDataTemp.push(newDataPoint);
    }
    setChartData(chartDataTemp);
    setChartLabel(chartLabelTemp);
    // return chartDataTemp;
  };

  useEffect(() => {
    axios
      .get("https://disease.sh/v3/covid-19/historical/all?lastdays=30")
      .then((response) => {
        //console.log(response);
        // const chartDataTemp = buildChartData(response.data, "cases");
        buildChartData(response.data, "cases");
        // setChartData(chartDataTemp);
        // console.log(chartData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [casesType]);

  return (
    <div className="chart">
      <Line
        data={{
          labels: chartLabel,
          datasets: [
            {
              label: "#CORONAVIRUS CASES",
              backgroundColor: "rgba(204, 16, 52, 0.5)",
              borderColor: "#CC1034",
              data: chartData,
              pointRadius: 1,
              pointHoverBorderColor: "blue",
            },
          ],
        }}
        options={{
          legend: {
            display: false,
          },
        }}
      />
    </div>
  );
}

export default LineGraph;

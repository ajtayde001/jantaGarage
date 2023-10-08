import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const ApexChart = ({ catNameArray, catCountArray, posi, legenda ,widths,lableshow}) => {
  // console.log(catNameArray, catCountArray);
  const [chartData] = useState({
    series: catCountArray || [],
    options: {
      chart: {
        type: "donut",
      },
      plotOptions: {
        pie: {
          donut: {
            size: "82%",
            labels: {
              show: lableshow,
              total: {
                showAlways: true,
                // label:"",
                show: true,
                
                // width:100
              },
              position:"centre"
            },
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      labels: catNameArray || [],
      //   dataLabels: {
      //     dropShadow: {
      //       blur: 3,
      //       opacity: 0.8
      //     }
      //   },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
      legend: {
        show: legenda,

        position: posi || "right",

        // width: "100%",
        height: 100,
        horizontalAlign: "center",
        formatter: function (seriesName, opts) {
          return [
            `     ${
              opts.w.globals.series[opts.seriesIndex]
            }         ${seriesName}`,
          ];
        },

        // vericalAlign:"centre"
      },
    },
  });
  // useEffect(() => {

  // }, [catNameArray,catCountArray]);

  return (
    <>
    {/* <div id="chart" style={{ width: "400px" }}> */}
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="donut"
        width={widths}
      />
    {/* </div> */}
    </>
  );
};

export default ApexChart;

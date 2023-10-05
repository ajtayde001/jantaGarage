import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const ApexChart = ({catNameArray,catCountArray}) => {
    console.log(catNameArray,catCountArray)
  const [chartData] = useState({
    series:catCountArray , 
    options: {
      chart: {
        type: 'donut',
      },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              total: {
                showAlways: true,
                show: true
              }
            }
          }
        }
      },
      dataLabels: {
        enabled: false
      },
      labels:catNameArray,
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
              position: 'bottom',
            },
          },
        },
      ],
    },
  });
  useEffect(() => {
   
  }, [catNameArray,catCountArray]);
 
  return (
    <div id="chart" style={{width:"400px"}}>
      <ReactApexChart options={chartData.options} series={chartData.series} type="donut" />
    </div>
  );
};

export default ApexChart;

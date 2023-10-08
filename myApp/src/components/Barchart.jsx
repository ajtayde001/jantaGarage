import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const ApexChart3 = () => {
  const [chartData] = useState({
    series: [{
        data: [0]
      }],
    options: {
      chart: {
        width: 380,
        type: 'bar',
        height: 350
      },
      stroke: {
        show:false,
        width: 0,
      },
      plotOptions: {
        bar: {
            borderRadius: 4,
            horizontal: true,
        }
      },
      xaxis: {
        categories: ['1.0', '0.9', '0.8', '0.7', '0.6', '0.5', '0.4',
          '0.3', '0.2', '0.1'
        ],
      },
      dataLabels: {
        enabled: false
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    },
    
  })

  return (
    <div id="chart" style={{width:"300px",marginTop:"20px"}}>
      <ReactApexChart options={chartData.options} series={chartData.series} type="bar" />
    </div>
  );
};

export default ApexChart3;

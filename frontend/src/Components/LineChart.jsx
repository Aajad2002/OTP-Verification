import React from "react";
import ReactEcharts from "echarts-for-react";

const LineChart = ({ words }) => {
  const labels = [];
  const value = [];
  for (let i = 0; i < words.length; i++) {
    labels.push(words[i].word);
    value.push(words[i].frequency);
  }

  const option = {
    xAxis: {
      type: 'category',
      data: labels
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: value,
        type: 'line'
      }
    ]
  };


  return (
    <div className="w-full">
      <ReactEcharts option={option} />
    </div>
  );
};

export default LineChart;

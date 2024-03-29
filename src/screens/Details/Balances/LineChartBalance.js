import React, { useState } from 'react';
import { LineChart } from 'react-native-chart-kit';
import { Svg, Rect, Text } from 'react-native-svg';
import { Dimensions, View } from 'react-native';
const screenWidth = Dimensions.get('window').width;

export function LineChartBalance({ chartData, chartConfig, title = 'Balances' }) {
  const getData = function () {
    return {
      labels: chartData.labels,
      datasets: [
        {
          data: chartData.data,
        },
      ],
      legend: [title],
    };
  };
  let [tooltipPos, setTooltipPos] = useState({
    x: 0,
    y: 0,
    visible: false,
    value: 0,
  });

  const formatLabel = function (label) {
    if (label > 10 ** 6) {
      let i = Math.trunc(label / 10 ** 6);
      let f = Math.trunc((label % 10 ** 6) / 10 ** 4);
      return `${i}.${f} M`;
    } else if (label > 10 ** 5) {
      return `${label.slice(0, 3)} m`;
    }
    return label;
  };

  return (
    <LineChart
      data={getData()}
      width={screenWidth}
      height={320}
      verticalLabelRotation={20}
      horizontalLabelRotation={20}
      chartConfig={chartConfig}
      yAxisLabel="$"
      bezier
      formatYLabel={(label) => {
        return formatLabel(label);
      }}
      onDataPointClick={(data) => {
        let formated = chartData.formated_data[data.index];
        let date = chartData.formatted_dates[data.index];
        let isSamePoint = tooltipPos.x === data.x && tooltipPos.y === data.y;

        isSamePoint
          ? setTooltipPos((previousState) => {
              return {
                ...previousState,
                value: data.value,
                visible: !previousState.visible,
              };
            })
          : setTooltipPos({
              x: data.x,
              value: data.value,
              y: data.y,
              visible: true,
              formated: formated,
              date: date,
            });
      }}
      decorator={() => {
        return tooltipPos.visible ? (
          <View>
            <Svg>
              <Rect
                x={tooltipPos.x - 40}
                y={tooltipPos.y + 10}
                width="90"
                height="60"
                fill="rgba(0, 171, 227, 0.8)"
              />
              <Text
                x={tooltipPos.x + 5}
                y={tooltipPos.y + 30}
                fill="white"
                fontSize="16"
                fontWeight="bold"
                textAnchor="middle"
              >
                {tooltipPos.formated}
              </Text>
              <Text
                x={tooltipPos.x + 5}
                y={tooltipPos.y + 60}
                fill="white"
                fontSize="16"
                fontWeight="bold"
                textAnchor="middle"
              >
                {tooltipPos.date}
              </Text>
            </Svg>
          </View>
        ) : null;
      }}
    />
  );
}

import React from 'react';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions, View, StyleSheet } from 'react-native';
import Legend from './PieChartLegend';
import CustomIndicator from '../../../components/CustomIndicator';
import Text from '@/Text';

const screenWidth = Dimensions.get('window').width;
function random_rgba() {
  var o = Math.round,
    r = Math.random,
    s = 200;
  return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + '1' + ')';
}

export function TransactionsPieChart({
  total,
  chartData,
  chartConfig,
  title = 'Expenses by Categories',
  loading = false,
}) {
  const getData = function () {
    chartData.forEach((element) => {
      element.color = random_rgba();
      element.legendFontSize = 15;
      element.legendFontColor = 'black';
    });
    return chartData;
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title} text={title} />
        <Text style={styles.subtitle} text={total} />
      </View>
      {loading ? (
        <View style={styles.loadingContainer}>
          <CustomIndicator size={165} center={false} />
        </View>
      ) : (
        <View style={styles.bodyContainer}>
          <View style={styles.chartContainer}>
            <PieChart
              data={getData()}
              width={screenWidth}
              height={220}
              chartConfig={chartConfig}
              accessor={'amount'}
              paddingLeft={'15'}
              center={[0, 0]}
              backgroundColor="transparent"
              absolute
              hasLegend={false}
            />
          </View>
          <View style={styles.legendContainer}>
            {getData().map(({ name, color }) => {
              return <Legend key={name} name={name} color={color} />;
            })}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    width: '100%',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  bodyContainer: {
    flexDirection: 'row',
  },
  chartContainer: {
    flex: 1,
  },
  legendContainer: {
    flex: 1,
    marginTop: 20,
  },
  loadingContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginTop: 20,
    marginLeft: 30,
  },
});

import {h} from 'preact';
import 'chartjs-adapter-date-fns';
import Chart from 'chart.js/auto';
import {format} from 'date-fns';
import {Line} from 'react-chartjs-2';

function BACGraph({bacForecast, currentBacIndex, drinks}) {
  const xAxisLabels = Array.from({length: bacForecast.length}, (_, i) => {
    // USE FIRST DRINK THAT INCREASES BAC NOT THE FIRST DRINK, IT COULD ALREADY BE METABOLIZED
    const date = new Date(drinks[0].time + i * 5 * 60 * 1000); // i * 5 minutes
    return format(new Date(date), 'h:mm a');
  });

  const data = {
    labels: xAxisLabels,
    datasets: [
      {
        data: [
          ...bacForecast.map((value, index) => ({
            x: xAxisLabels[index],
            y: value,
          })),
          {x: xAxisLabels[currentBacIndex], y: bacForecast[currentBacIndex]},
        ],
        fill: false,
        borderColor: '#00FF00',
        tension: 0.1,
        label: 'BAC (%)',
        pointBackgroundColor: bacForecast.map((_, index) =>
          index === currentBacIndex ? 'red' : 'blue',
        ),
        pointRadius: bacForecast.map((_, index) =>
          index === currentBacIndex ? 5 : 1,
        ),
      },
    ],
  };

  const options = {
    scales: {
      x: {
        grid: {
          color: 'rgba(51, 51, 51)',
        },
      },
      y: {
        grid: {
          color: 'rgba(51, 51, 51)',
        },
      },
    },
  };

  return <Line data={data} options={options} />;
}

export default BACGraph;

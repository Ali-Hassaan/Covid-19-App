import React, { useState, useEffect, } from 'react';
import { Line, Bar, Polar} from 'react-chartjs-2';

import { fetchDailyData } from '../../api';

import styles from './Chart.module.css';




const Chart = ({ data: { confirmed, recovered, deaths }, country }) => {
  const [dailyData, setDailyData] = useState({});

  useEffect(() => {
    const fetchMyAPI = async () => {
      const initialDailyData = await fetchDailyData();

      setDailyData(initialDailyData);
    };

    fetchMyAPI();
  }, []);

  const barChart = (
    confirmed ? (
      <Bar
        data={{
          labels: ['Infected', 'Recovered', 'Deaths'],
          datasets: [
            {
              label: 'People',
              backgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.5)'],
              hoverBackgroundColor: ['rgba(0, 0, 255)', 'rgba(0, 255, 0)', 'rgba(255, 0, 0)'],
              hoverBorderWidth: 50,
              data: [confirmed.value, recovered.value, deaths.value],
            },
          ],
        }}
        options={{
          legend: { display: false },
          title: { display: true, text: `Current state in ${country}` },
        }}
      />
    ) : null
  );

  const lineChart = (
    dailyData[0] ? (
      <Line
        data={{
          labels: dailyData.map(({ date }) => date),
          datasets: [{
            data: dailyData.map((data) => data.confirmed),
            label: 'Infected',
            borderColor: 'rgba(0, 255, 0, 0.5)',
            fill: true,
          }, {
            data: dailyData.map((data) => data.deaths),
            label: 'Deaths',
            borderColor: 'rgba(255, 0, 0, 0.5)',
            backgroundColor: 'rgba(255, 0, 0, 0.5)',
            fill: true,
          },
          ],
        }}
      />
    ) : null
  );

  if(!confirmed) {
    return "..loading";
}
//console.log(confirmed.value);
let confirmedValue = confirmed.value;
let recoveredValue = recovered.value;
let deathsValue = deaths.value;
const polarChart = (
    
    <Polar 
        data={{
            labels: ['Confirmed', 'Recovered', 'Deaths'],
            datasets: [
                {
                    data: [confirmedValue, recoveredValue, deathsValue],
                    backgroundColor: [
                        'rgb(0, 0, 255, 0.5)',
                        'rgb(0, 255, 0, 0.5)',
                        'rgb(255, 0, 0, 0.5)',
                    ], 
                    borderColor: ['rgb(0, 0, 0)',
                    'rgb(0, 0, 0)',
                    'rgb(0, 0, 0)',],
                    hoverBackgroundColor: ['rgb(0, 0, 255)',
                    'rgb(0, 255, 0)',
                    'rgb(255, 0, 0)',],
                    hoverBorderWidth: 3,
                }
            ]
        }}
        options={{
            title: { display: true, text: `(Infected vs Recovered vs Deaths) ${country}`},
            plugins: {
                labels: [
                    {
                        render: 'percentage',
                        precision: 0,
                        position: 'outside'
                    }
                ]
            }
        }}
    />
);




  return (
    <div>
    <div className={styles.barChartClass}>
      {country ? barChart : lineChart}
      </div>
      <div className={styles.polarChartClass}>
                    {polarChart}
                </div>
                
     </div>
  );
};





export default Chart;
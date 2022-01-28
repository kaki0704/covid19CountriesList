import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { Case } from '../types'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

interface Props {
  countryMonth: Case[]
}

const LineChart: React.FC<Props> = ({ countryMonth }) => {
  return (
    <>
      <Line
        data={{
          labels: countryMonth.map((month) => month.Date.split('T')[0]),
          datasets: [
            {
              label: '日別の推移',
              data: countryMonth.map((month) => month.Cases),
              backgroundColor: 'rgb(255, 99, 132)',
              borderColor: 'rgb(255, 99, 132)'
            }
          ]
        }}
        height={400}
        width={600}
        options={{
          maintainAspectRatio: false,
          scales: {
            yAxes: {
              suggestedMax: Math.max(...countryMonth.map((month) => month.Cases)) * 2,
              beginAtZero: true
            }
          }
        }}
      />
    </>
  )
}

export default LineChart

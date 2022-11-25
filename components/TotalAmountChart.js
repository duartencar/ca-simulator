import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'top',
            font: {
                family: "'Quicksand', sans-serif"
            }
        },
        title: {
            display: true,
            text: 'Evolução do valor total',
            font: {
                family: "'Quicksand', sans-serif"
            }
        },
    }
};

const TotalAmountChart = ({ labels, values, showYearly }) => {

    console.log("chart")

    const totalValueData = [values[0]];
    const chartLabels = [labels[0]];
    const period = showYearly ? 4 : 1;

    for (let i = period; i < values.length; i += period) {
        chartLabels.push(labels[i]);
        totalValueData.push(values[i]);
    }

    const chartData = {
        labels: chartLabels,
        datasets: [
            {
                label: 'Valor total',
                data: totalValueData,
                borderColor: '#DC965A',
                backgroundColor: '#DC965A',
            }
        ]
    }

    return (
        <div className='totalValueChart' style={{
            position: "relative", height: "40vh", width: "80%"
        }}>
            <Line options={options} data={chartData} />
        </div >
    );
}

export default TotalAmountChart;
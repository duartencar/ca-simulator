import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    BarElement
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
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
            text: 'Evolução dos Juros',
            font: {
                family: "'Quicksand', sans-serif"
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
};

const ProfitChart = ({ labels, values, showYearly }) => {

    const profitValues = [0];
    const chartLabels = [labels[0]];
    const period = showYearly ? 4 : 1;

    for (let i = period; i < values.length; i += period) {
        chartLabels.push(labels[i]);
        profitValues.push(values[i] - values[i - period]);
    }

    const chartData = {
        labels: chartLabels,
        datasets: [
            {
                label: `Juro ${showYearly ? 'anual' : 'trimestral'}`,
                data: profitValues,
                borderColor: '#468847',
                backgroundColor: '#468847',
            }
        ]
    }

    return (
        <div className='totalValueChart' style={{
            position: "relative", height: "40vh", width: "80%"
        }}>
            <Bar options={options} data={chartData} />
        </div >
    );
}

export default ProfitChart;
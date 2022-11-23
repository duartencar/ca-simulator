import { Line } from 'react-chartjs-2';

const MONTHS = ['jan', 'feb', 'mar', 'abr', 'mai', 'jun', 'jul', 'aug', 'set', 'out', 'nov', 'dez'];
const TIMESTERS_IN_TEN_YEARS = 40;
const TWO_TO_FIVE_YEARS_BONUS = 0.5;
const SIX_TO_TEN_YEARS_BONUS = 1.0;
const TAX = 28;

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
            text: 'Valor total',
            font: {
                family: "'Quicksand', sans-serif"
            }
        },
    }
};

const generateLabels = (startDate) => {

    const labels = [];
    let year = startDate.split("-")[0];
    let monthIndex = startDate.split("-")[1] - 1;
    let previousMonthIndex;

    for (let trim = 0; trim <= TIMESTERS_IN_TEN_YEARS; trim++) {

        // save previous index for comparison
        previousMonthIndex = monthIndex;

        // add string to array
        labels.push(`${year}-${MONTHS[monthIndex]}`);

        // move foward 3 MONTHS
        monthIndex = (monthIndex + 3) % 12;

        // increase year
        if (previousMonthIndex > monthIndex) {
            year++;
        }
    }

    return labels;
}

const calculateTotalValue = (initialAmount, euriborRate) => {

    const values = [initialAmount];

    for (let trim = 1; trim <= TIMESTERS_IN_TEN_YEARS; trim++) {
        let rate = euriborRate < 0 ? Math.max(0.0, euriborRate + 1.0) : Math.min(3.5, euriborRate + 1);

        if (trim > 4 && trim < 20) {
            rate += TWO_TO_FIVE_YEARS_BONUS;
        }
        if (trim >= 20) {
            rate += SIX_TO_TEN_YEARS_BONUS;
        }

        const grossPofit = values[values.length - 1] * rate / 100 / 4;

        const netProfit = grossPofit * ((100 - TAX) / 100);

        const newValue = values[values.length - 1] + netProfit;

        values.push(Math.round((newValue + Number.EPSILON) * 100) / 100);
    }

    return values;
}

const TotalAmountChart = ({ startingDate, startingValue, startingEuriborRate }) => {

    const chartData = {
        labels: generateLabels(startingDate),
        datasets: [
            {
                label: 'Valor total',
                data: calculateTotalValue(Number(startingValue), Number(startingEuriborRate)),
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
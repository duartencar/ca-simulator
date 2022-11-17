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

import { useState, useEffect } from 'react';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const options = {
	responsive: true,
	plugins: {
		legend: {
			position: 'top',
		},
		title: {
			display: true,
			text: 'Chart.js Line Chart',
		},
	},
};

const MONTHS = ['jan', 'feb', 'mar', 'abr', 'mai', 'jun', 'jul', 'aug', 'set', 'out', 'nov', 'dez'];
const TIMESTERS_IN_TEN_YEARS = 40;
const TWO_TO_FIVE_YEARS_BONUS = 0.5;
const SIX_TO_TEN_YEARS_BONUS = 1.0;

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
		console.log(trim, rate)

		if (trim > 4 && trim < 20) {
			rate += TWO_TO_FIVE_YEARS_BONUS;
		}
		if (trim >= 20) {
			rate += SIX_TO_TEN_YEARS_BONUS;
		}
		let newValue = values[values.length - 1] + values[values.length - 1] * rate / 100 / 4;

		values.push(newValue);
	}

	return values;
}

export default function Home() {

	console.log("Render");

	const [startingDate, setDate] = useState(new Date().toISOString().slice(0, 10))
	const [startingValue, setStartingValue] = useState(100);
	const [startingEuriborRate, setStartingEuriborRate] = useState(1.803);
	const [charData, setChartData] = useState({
		labels,
		datasets: [
			{
				label: 'Valor total',
				data: [3000, 3000, 3000, 3015, 3015, 3015, 3030],
				borderColor: 'rgb(255, 99, 132)',
				backgroundColor: 'rgba(255, 99, 132, 0.5)',
			}
		]
	});

	const onDateChange = (event) => {
		setDate(event.target.value);
	}

	const onStartingValueChange = (event) => {
		setStartingValue(event.target.value);
	}

	const onEuriborValueChange = (event) => {
		setStartingEuriborRate(event.target.value);
	}

	useEffect(() => {
		setChartData({
			labels: generateLabels(startingDate),
			datasets: [
				{
					label: 'Valor total',
					data: calculateTotalValue(Number(startingValue), Number(startingEuriborRate)),
					borderColor: 'rgb(255, 99, 132)',
					backgroundColor: 'rgba(255, 99, 132, 0.5)',
				}
			]
		})
	}, [startingDate, startingValue, startingEuriborRate])

	return (
		<div>
			<div>
				<h1>Simulador de certificado de aforro</h1>
			</div>
			<div id="input_area">
				<input type="number" name="Número de unidades" min='100' max='250000' placeholder='Múltiplo de 100' step='100' value={startingValue} onChange={(e) => onStartingValueChange(e)} required />
				<input type="number" name="Euribor" min='-0.50' max='5.00' placeholder='Taxa euribor inicial' step='0.01' value={startingEuriborRate} onChange={(e) => onEuriborValueChange(e)} required />
				<input type="date" name="Start date" min="2017-10-01" max="2025-10-30" value={startingDate} onChange={(e) => onDateChange(e)} />
			</div>
			<div id="chart_area">
				<Line options={options} data={charData} />
			</div>
		</div>
	)
}

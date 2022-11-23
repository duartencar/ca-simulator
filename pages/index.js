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

import { useState, useMemo, useEffect } from 'react';
import TotalAmountChart from '../components/TotalAmountChart';
import PageTitle from '../components/PageTitle';

import styles from './index.module.css'
import VerticalAd from '../components/VerticalAd';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

export default function Home() {

	console.log("Render");

	const [startingDate, setDate] = useState(new Date().toISOString().slice(0, 10))
	const [startingValue, setStartingValue] = useState(100);
	const [startingEuriborRate, setStartingEuriborRate] = useState(1.803);

	useEffect(() => {
		var ads = document.getElementsByClassName("adsbygoogle").length;
		for (var i = 0; i < ads; i++) {
			try {
				(adsbygoogle = window.adsbygoogle || []).push({});
			} catch (e) { }
		}
	}, []);



	const onDateChange = (event) => {
		setDate(event.target.value);
	}

	const onStartingValueChange = (event) => {
		setStartingValue(event.target.value);
	}

	const onEuriborValueChange = (event) => {
		setStartingEuriborRate(event.target.value);
	}

	return (
		<div className={styles.homePage}>
			<div className={styles.pub}>
				<VerticalAd />
			</div>
			<div className='content'>
				<div className={styles.PageTitle} >
					{useMemo(() => <PageTitle />, [])}
				</div>
				<div className={styles.interactive}>
					<TotalAmountChart startingDate={startingDate} startingValue={startingValue} startingEuriborRate={startingEuriborRate} />
					<div className={styles.inputArea}>
						<div className={styles.simInput}>
							<label>Número de unidades:</label>
							<input type="number" name="Número de unidades" min='100' max='250000' placeholder='Múltiplo de 100' step='100' value={startingValue} onChange={(e) => onStartingValueChange(e)} required />
						</div>
						<div className={styles.simInput}>
							<label>Taxa Euribor:</label>
							<input type="number" name="Euribor" min='-0.50' max='5.00' placeholder='Taxa euribor inicial' step='0.01' value={startingEuriborRate} onChange={(e) => onEuriborValueChange(e)} required />
						</div>
						<div className={styles.simInput}>
							<label>Data de subscrição:</label>
							<input type="date" name="Start date" min="2017-10-01" max="2025-10-30" value={startingDate} onChange={(e) => onDateChange(e)} />
						</div>
					</div>
				</div>
			</div>
			<div className={styles.pub}>
				<VerticalAd />
			</div>
		</div >
	)
}

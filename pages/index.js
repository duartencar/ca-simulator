import { useState, useMemo, useEffect } from 'react';
import TotalAmountChart from '../components/TotalAmountChart';
import ProfitChart from '../components/ProfitChart';
import PageTitle from '../components/PageTitle';
import VerticalAd from '../components/VerticalAd';
import MainStats from '../components/MainStats/MainStats';

import styles from './index.module.css'
import { generateLabels, calculateTotalValue } from '../logic/interest';

export default function Home() {

	// UI controls
	const [startingDate, setDate] = useState(new Date().toISOString().slice(0, 10))
	const [startingValue, setStartingValue] = useState(100);
	const [startingEuriborRate, setStartingEuriborRate] = useState(1.803);
	const [displayAnnually, setDisplayAnnualy] = useState(false);

	// Responsive
	const [isMobile, setIsMobile] = useState(true);

	// Interest
	const [labels, setChartLables] = useState(generateLabels(startingDate));
	const [totalCapital, setTotalCapital] = useState(calculateTotalValue(Number(startingValue), Number(startingEuriborRate)));


	function handleWindowSizeChange() {
		setIsMobile(window.innerWidth <= 375);
	}

	useEffect(() => {
		window.addEventListener('resize', handleWindowSizeChange);
		return () => {
			window.removeEventListener('resize', handleWindowSizeChange);
		}
	}, []);

	useEffect(() => {
		const ads = document.getElementsByClassName("adsbygoogle").length;
		for (let i = 0; i < ads; i++) {
			try {
				(adsbygoogle = window.adsbygoogle || []).push({});
			} catch (e) { }
		}
	}, []);

	useEffect(() => {
		setChartLables(generateLabels(startingDate))
	}, [startingDate]);

	useEffect(() => {
		setTotalCapital(calculateTotalValue(Number(startingValue), Number(startingEuriborRate)))
	}, [startingEuriborRate, startingValue]);

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
				<VerticalAd isMobile={isMobile} />
			</div>
			<div className='content'>
				<div className={styles.PageTitle} >
					{useMemo(() => <PageTitle />, [])}
				</div>
				<div className={styles.interactive}>
					<div className={styles.displayArea}>
						<div className={styles.timeFrameControl}>
							<label>Trimestral</label>
							<label className={styles.switch}>
								<input type="checkbox" value={displayAnnually} onChange={() => setDisplayAnnualy(!displayAnnually)} />
								<span className={styles.slider}></span>
							</label>
							<label>Anual</label>
						</div>
						<TotalAmountChart labels={labels} values={totalCapital} showYearly={displayAnnually} isSmallMobile={isMobile} />
						<ProfitChart labels={labels} values={totalCapital} showYearly={displayAnnually} isSmallMobile={isMobile} />
					</div>
					<div className={styles.hero}>
						<div className={styles.inputArea}>
							<div className={styles.simInput}>
								<label>Número de unidades:</label>
								<input type="number" name="Número de unidades" min='100' max='250000' placeholder='Múltiplo de 100' step='100' value={startingValue} onChange={(e) => onStartingValueChange(e)} required />
							</div>
							<div className={styles.simInput}>
								<label>Taxa Euribor 3 meses:</label>
								<input type="number" name="Euribor" min='-0.50' max='5.00' placeholder='Taxa euribor inicial' step='0.01' value={startingEuriborRate} onChange={(e) => onEuriborValueChange(e)} required />
							</div>
							<div className={styles.simInput}>
								<label>Data de subscrição:</label>
								<input type="date" name="Start date" min="2017-10-01" max="2025-10-30" value={startingDate} onChange={(e) => onDateChange(e)} />
							</div>
						</div>
						{useMemo(() => <MainStats values={totalCapital} />, [totalCapital])}
					</div>

				</div>
			</div>
			<div className={styles.pub}>
				<VerticalAd isMobile={isMobile} />
			</div>
		</div >
	)
}

import styles from './MainStats.module.css'

function MainStats({ values }) {

    const finalCapital = values[values.length - 1];
    const profit = Math.round(((values[values.length - 1] - values[0]) / values[0] * 100 + Number.EPSILON) * 100) / 100;
    // Math.round((newValue + Number.EPSILON) * 100) / 100)

    return (
        <div className={styles.statsWrapper}>
            <div className={styles.stat}>
                <div>
                    <p>Capital após 10 anos</p>
                </div>
                <div className={styles.statValue}>
                    <span>{finalCapital}</span>
                    <span>&euro;</span>
                </div>
            </div>
            <div className={styles.stat}>
                <div>
                    <p>Rentabilidade após 10 anos</p>
                </div>
                <div className={styles.statValue}>
                    <span>{profit}</span>
                    <span>&#37;</span>
                </div>
            </div>
        </div>
    );
}

export default MainStats;
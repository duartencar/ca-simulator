export const MONTHS = ['jan', 'feb', 'mar', 'abr', 'mai', 'jun', 'jul', 'aug', 'set', 'out', 'nov', 'dez'];
export const TIMESTERS_IN_TEN_YEARS = 40;
export const TWO_TO_FIVE_YEARS_BONUS = 0.5000;
export const SIX_TO_TEN_YEARS_BONUS = 1.0000;
export const TAX = 28;


export const generateLabels = (startDate) => {

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

export const calculateTotalValue = (initialAmount, euriborRate) => {

    const values = [initialAmount];

    for (let trim = 1; trim <= TIMESTERS_IN_TEN_YEARS; trim++) {
        let rate = euriborRate < 0 ? Math.max(0.0000, euriborRate + 1.0000) : Math.min(3.5000, euriborRate + 1.0000);

        if (trim > 4 && trim <= 20) {
            rate += TWO_TO_FIVE_YEARS_BONUS;
        }
        if (trim > 20) {
            rate += SIX_TO_TEN_YEARS_BONUS;
        }

        const grossPofit = values[values.length - 1] * rate / 100.0 / 4.0;

        const netProfit = grossPofit * ((100 - TAX) / 100);

        const newValue = values[values.length - 1] + netProfit;

        values.push(Math.round((newValue + Number.EPSILON) * 100) / 100);
    }

    return values;
}
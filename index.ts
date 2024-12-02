const electricityUserData = {
	readings: 95,
	units: "kWt",
	mode: "double",
};

const waterUserData = {
	readings: 3,
	units: "m3",
};

const elRate: number = 0.45;
const wRate: number = 2;

const monthPayments: number[] = [0, 0];

const calculatePayments = ({ readings, mode }: { readings: number, mode: string }, wData: { readings: number }, elRate: number, wRate: number): void => {
	if (mode === "double" && readings < 50) {
		monthPayments[0] = readings * elRate * 0.7;
	} else {
		monthPayments[0] = readings * elRate;
	}

	monthPayments[1] = wData.readings * wRate;
};

calculatePayments(electricityUserData, waterUserData, elRate, wRate);

const sendInvoice = (monthPayments: number[], {readings, units}: { readings: number, units: string }, wData: {readings: number, units: string}): string => {
	const text = `    Hello!
    This month you used ${readings} ${units} of electricity
    It will cost: ${monthPayments[0]}€
    
    This month you used ${wData.readings} ${wData.units} of water
    It will cost: ${monthPayments[1]}€`;

	return text;
};

const result = sendInvoice(monthPayments, electricityUserData, waterUserData);

console.log(result);
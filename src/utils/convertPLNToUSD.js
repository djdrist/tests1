export const convertPLNToUSD = (PLN) => {
	if (typeof PLN === 'object' || typeof PLN === 'function') {
		return 'Error';
	}
	if (typeof PLN === 'string' || !PLN) {
		return NaN;
	}

	let PLNtoUSD;

	if (PLN <= 0) {
		PLNtoUSD = 0;
	} else {
		PLNtoUSD = PLN / 3.5;
	}

	const formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	});

	return formatter.format(PLNtoUSD).replace(/\u00a0/g, ' ');
};

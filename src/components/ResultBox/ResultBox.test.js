import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ResultBox from './ResultBox';
import { formatAmountInCurrency } from './../../utils/formatAmountInCurrency';

describe('Component ResultBox', () => {
	it('should render without crashing', () => {
		render(
			<ResultBox
				from='PLN'
				to='USD'
				amount={100}
			/>
		);
	});
	it('should render proper info about conversion when PLN -> USD', () => {
		const testCases = [
			{ amount: '100', from: 'PLN', to: 'USD' },
			{ amount: '20', from: 'PLN', to: 'USD' },
			{ amount: '200', from: 'PLN', to: 'USD' },
			{ amount: '345', from: 'PLN', to: 'USD' },
		];

		for (const testObj of testCases) {
			render(
				<ResultBox
					from={testObj.from}
					to={testObj.to}
					amount={parseInt(testObj.amount)}
				/>
			);
			const mainDiv = screen.getByTestId('mainDiv');
			expect(mainDiv).toHaveTextContent(
				formatAmountInCurrency(testObj.amount, testObj.from) + ' = ' + formatAmountInCurrency(parseFloat(testObj.amount / 3.5), testObj.to)
			);
			cleanup();
		}
	});
	it('should render proper info about conversion when USD -> PLN', () => {
		const testCases = [
			{ amount: '100', from: 'USD', to: 'PLN' },
			{ amount: '20', from: 'USD', to: 'PLN' },
			{ amount: '200', from: 'USD', to: 'PLN' },
			{ amount: '345', from: 'USD', to: 'PLN' },
		];

		for (const testObj of testCases) {
			render(
				<ResultBox
					from={testObj.from}
					to={testObj.to}
					amount={parseInt(testObj.amount)}
				/>
			);
			const mainDiv = screen.getByTestId('mainDiv');
			expect(mainDiv).toHaveTextContent(
				formatAmountInCurrency(testObj.amount, testObj.from) + ' = ' + formatAmountInCurrency(parseFloat(testObj.amount * 3.5), testObj.to)
			);
			cleanup();
		}
	});
	it('should render proper info about conversion when from = to', () => {
		const testCases = [
			{ amount: '100', from: 'USD', to: 'USD' },
			{ amount: '20', from: 'USD', to: 'USD' },
			{ amount: '200', from: 'PLN', to: 'PLN' },
			{ amount: '345', from: 'PLN', to: 'PLN' },
		];

		for (const testObj of testCases) {
			render(
				<ResultBox
					from={testObj.from}
					to={testObj.to}
					amount={parseInt(testObj.amount)}
				/>
			);
			const mainDiv = screen.getByTestId('mainDiv');
			expect(mainDiv).toHaveTextContent(formatAmountInCurrency(testObj.amount, testObj.from) + ' = ' + formatAmountInCurrency(testObj.amount, testObj.to));
			cleanup();
		}
	});
	it('should render proper info about conversion when negative amount', () => {
		const testCases = [
			{ amount: '-1', from: 'PLN', to: 'USD' },
			{ amount: '-100', from: 'PLN', to: 'USD' },
			{ amount: '-420', from: 'PLN', to: 'USD' },
			{ amount: '-34', from: 'PLN', to: 'USD' },
		];

		for (const testObj of testCases) {
			render(
				<ResultBox
					from={testObj.from}
					to={testObj.to}
					amount={parseInt(testObj.amount)}
				/>
			);
			const mainDiv = screen.getByTestId('mainDiv');
			expect(mainDiv).toHaveTextContent('Wrong value...');
			cleanup();
		}
	});
});

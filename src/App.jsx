import './App.css';
import React from 'react';
import BarChart from './BarChartSVG';
// import BarChart from './BarChartWebGL.js';
import population from './population.json';

const dataset = {
	title: 'World population',
	data: [
		{ year: '1950', population: 2.525 },
		{ year: '1960', population: 3.018 },
		{ year: '1970', population: 3.682 },
		{ year: '1980', population: 4.44 },
		{ year: '1990', population: 5.31 },
		{ year: '2000', population: 6.127 },
		{ year: '2010', population: 6.93 },
	],
};

const App = () => {
	const [dataSet, setDataSet] = React.useState(population);
	// const didMount = React.useRef(false);

	// React.useEffect(() => {
	// 	if (!didMount.current) {
	// 		didMount.current = true;

	// 		// Create an effect where we make a new random dataset every second
	// 		// Showcases the update functionality
	// 		setInterval(function () {
	// 			for (let i = 0; i < dataset.data.length; i++) {
	// 				dataSet.data[i].population = Math.random() * 7;
	// 			}

	// 			dataSet.title = 'World Population (as of ' + new Date().getMinutes() + ':' + new Date().getSeconds() + ')';
	// 			setDataSet(JSON.parse(JSON.stringify(dataSet)));
	// 		}, 1000);
	// 	}
	// }, [dataSet, setDataSet, didMount]);
	const updatePopulation = (e, cEntry) => {
		const newPopulation = +e.target.value;
		console.log('updatePopulation.fired', { ...cEntry, newPopulation });

		setDataSet((prev) => {
			const newDataSet = { ...prev };

			//iterate through the data key and replace the population of the year that equals cyear
			newDataSet.data = newDataSet.data.map(({ population, year }) => ({ year, population: +(cEntry.year === year ? newPopulation : population) }));
			// console.table(newDataSet.data);
			return newDataSet;
		});
	};

	return (
		<div className='App' style={{ display: 'flex' }}>
			<div className='nfc-left-app-box' style={{ flex: '50%' }}>
				{/* show data on the left in a list */}
				{dataSet.data.map((entry) => (
					<li key={JSON.stringify(entry)}>
						{/* year , pop inputs */}
            Input
						<input type='number' step={0.01} value={entry.year} />
						<input type='number' step={0.01} defaultValue={entry.population} onChange={(e) => updatePopulation(e, entry)} />
					</li>
				))}
			</div>
			{/* <BarChart dataset={dataSet} /> */}
			<BarChart dataset={dataSet} />
		</div>
	);
};

export default App;

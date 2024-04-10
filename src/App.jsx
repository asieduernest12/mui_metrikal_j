import './App.css';
import React from 'react';
import BarChart from './BarChartSVG';
// import BarChart from './BarChartWebGL.js';
import { Box, Stack, AppBar, Toolbar, Typography, IconButton, TextField, Table, TableRow, TableCell, TableHead, TableBody } from '@mui/material';
import population from './population.json';
import { Menu, Delete as DeleteIcon, AddCircleOutline as AddIcon } from '@mui/icons-material';
import { useState } from 'react';

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

const _tempPoint = { year: '', population: 0 };

const App = () => {
	const [dataSet, setDataSet] = React.useState(population);
	const [tempPoint, setTempPoint] = useState(_tempPoint);
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

	const addPoint = (/** @type {(typeof dataset)['data'][number]} */ newPoint) => {
		setDataSet((prev) => ({ ...prev, data: [...prev.data, newPoint] }));
		setTempPoint({ ..._tempPoint });
	};
	const removeEntry = (year) => {
		setDataSet((prev) => ({ ...prev, data: prev.data.filter((yp) => yp.year !== year) }));
	};

	return (
		<Stack direction='column' width='100%'>
			<AppBar position='fixed' color='primary'>
				<AppBar position='fixed' color='primary'>
					<Toolbar>
						<IconButton edge='start' color='inherit' aria-label='menu'>
							<Menu />
						</IconButton>
						<Typography variant='h6'>Metrikal</Typography>
					</Toolbar>
				</AppBar>
			</AppBar>
			<Stack direction='row' width='100%' spacing={10} mt={10}>
				<Box width='50%'>
					<Table>
						{/* provide update form in tablehead */}

						<TableHead>
							<TableRow>
								<TableCell>
									<TextField
										name='year'
										label='Year'
										defaultValue={new Date().getFullYear()}
										value={tempPoint.year}
										onChange={(e) => setTempPoint((tp) => ({ ...tp, year: e.target.value }))}
									/>
								</TableCell>
								<TableCell>
									<TextField
										name='population'
										label='Population'
										step={0.01}
										value={tempPoint.population}
										onChange={(e) => setTempPoint((tp) => ({ ...tp, population: e.target.value }))}
									/>
								</TableCell>
								<TableCell>
									<IconButton aria-label='' onClick={() => addPoint(tempPoint)}>
										<AddIcon />
									</IconButton>
								</TableCell>
							</TableRow>
						</TableHead>
						{/* show datapoint in the table body */}
						<TableBody>
							{dataSet.data.map((entry) => (
								<TableRow key={JSON.stringify(entry)}>
									<TableCell>
										<TextField type='number' step={0.01} value={entry.year} label='Year' inputProps={{ readOnly: true }} />
									</TableCell>
									<TableCell>
										<TextField type='number' step={0.01} value={entry.population} label='Population' inputProps={{ readOnly: true }} />
									</TableCell>
									<TableCell>
										<IconButton aria-label='' onClick={() => removeEntry(entry.year)}>
											<DeleteIcon />
										</IconButton>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</Box>

				<Box width={'50%'}>
					<BarChart dataset={dataSet} />
				</Box>
			</Stack>
		</Stack>
	);
};

export default App;

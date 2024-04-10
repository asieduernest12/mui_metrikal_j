import './App.css';
import React from 'react';
import BarChart from './BarChartSVG';
// import BarChart from './BarChartWebGL.js';
import {
	Box,
	Stack,
	AppBar,
	Toolbar,
	Typography,
	IconButton,
	TextField,
	Table,
	TableRow,
	TableCell,
	TableHead,
	TableBody,
	Menu,
	MenuItem,
} from '@mui/material';
import population from './population.json';
import { Menu as MenuIcon, Delete as DeleteIcon, AddCircleOutline as AddIcon } from '@mui/icons-material';
import { useState } from 'react';
import { useRef } from 'react';

const _tempPoint = { year: '', population: 0 };

const App = () => {
	const [dataSet, setDataSet] = React.useState(population);
	const [tempPoint, setTempPoint] = useState(_tempPoint);
	const [menuOpen, setMenuOpen] = useState(false);
	const menuTriggerRef = useRef();

	const addPoint = (/** @type {(typeof dataSet)['data'][number]} */ newPoint) => {
		setDataSet((prev) => ({ ...prev, data: [...prev.data, newPoint] }));
		setTempPoint({ ..._tempPoint });
	};

	const removeEntry = (year) => {
		setDataSet((prev) => ({ ...prev, data: prev.data.filter((yp) => yp.year !== year) }));
	};

	const onFileChange = (event) => {
		const file = event.target.files[0];
		if (!file) {
			return;
		}

		const reader = new FileReader();
		reader.onload = (event) => {
			try {
				const json = JSON.parse(event.target.result);
				setDataSet(json);
			} catch (error) {
				console.error('Error parsing JSON', error);
			}
		};
		reader.onerror = (error) => console.error('Error reading file', error);
		reader.readAsText(file);
	};

	const saveFile = (data = dataSet) => {
		const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
		const url = URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = url;
		link.download = 'data.json';
		link.click();
		URL.revokeObjectURL(url);
	};

	return (
		<Stack direction='column' width='100%'>
			<AppBar color='primary'>
				<AppBar position='fixed' color='primary'>
					<Toolbar>
						<IconButton edge='start' color='inherit' aria-label='menu' onClick={() => setMenuOpen(true)} ref={menuTriggerRef}>
							<MenuIcon />
						</IconButton>
						<Menu id='save_and_load' anchorEl={menuTriggerRef} keepMounted open={Boolean(menuOpen)} onClose={() => setMenuOpen(false)}>
							<MenuItem onClick={() => null}>
								<label htmlFor='loadFile'>Load file</label>
								<input hidden type='file' id='loadFile' onChange={onFileChange} />
							</MenuItem>
							<MenuItem onClick={() => null}>Save</MenuItem>
							<MenuItem onClick={() => saveFile()}>Save as*</MenuItem>
						</Menu>
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

									<IconButton aria-label='' onClick={() => addPoint({ year: dataSet.data.at(-1).year + 1, population: Math.random() * 8.8 + 0.02 })}>
										Add Random
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

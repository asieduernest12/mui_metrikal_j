import './App.css';
import React from 'react';
import BarChart from './BarChart';
// import BarChart from './BarChartWebGL.js';
import { Box, Stack, AppBar, Toolbar, Typography, Menu, MenuItem, Button } from '@mui/material';
import population from './population.json';
import { useState } from 'react';
import { useRef } from 'react';
import { Header } from './Header';
import { Editor } from './Editor';
import PieChart from './PieChart';

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

	const saveFile = (data = dataSet, promptForFileName = false) => {
		const filename = !promptForFileName ? 'data.json' : prompt('enter a filename');
		const blob = new Blob([JSON.stringify({ ...data, filename, title: filename }, null, 2)], { type: 'application/json' });
		const url = URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = url;
		link.download = filename;
		link.click();
		URL.revokeObjectURL(url);
	};

	return (
		<Stack direction='column' width='100%'>
			{Header(setMenuOpen, menuTriggerRef, menuOpen, onFileChange, saveFile, dataSet)}
			<Stack direction='row' width='100%' spacing={10} mt={10}>
				<Box width='50%'>{Editor(tempPoint, setTempPoint, addPoint, dataSet, removeEntry)}</Box>

				<Stack width='50%' direction='vertical'>
					<BarChart dataset={dataSet} sx={{width:'50%'}}/>
					<PieChart dataset={dataSet} sx={{ width: '100%', height: '100%' }} />
				</Stack>
			</Stack>
		</Stack>
	);
};

export default App;
